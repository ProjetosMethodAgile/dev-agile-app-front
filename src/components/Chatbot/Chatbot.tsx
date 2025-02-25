"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Form } from '../form';
import { Send } from 'lucide-react';

type Message = {
    text: string;
    time: string;
    type: 'user' | 'bot';
    loading?: boolean;
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Olá, qual seu nome?", time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), type: 'bot' }
    ]);
    const [messageUser, setMessageUser] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = (newMessage: string, type: 'user' | 'bot', loading = false) => {
        setMessages(prevMessages => [
            ...prevMessages, 
            { 
                text: newMessage, 
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
                type,
                loading
            }
        ]);
    };

    const handleMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!messageUser.trim()) return;
        
        // Adiciona mensagem do usuário
        sendMessage(messageUser, 'user');
        setMessageUser("");
        
        // Adiciona mensagem de loading do bot
        sendMessage("Escrevendo", 'bot', true);
        
        // Após 1 segundo, atualiza a última mensagem para a resposta definitiva do bot
        setTimeout(() => {
            setMessages(prev => {
                const updated = [...prev];
                // Procura a última mensagem com loading === true
                const lastIndex = updated.findIndex(msg => msg.loading === true);
                if (lastIndex !== -1) {
                    updated[lastIndex] = {
                        ...updated[lastIndex],
                        text: "Ola rafael",
                        loading: false,
                        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    };
                }
                return updated;
            });
        }, 1000);
    };

    useEffect(() => {
        // Scroll automático para o final da lista quando as mensagens são atualizadas
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="w-[700px] h-[500px] flex flex-col items-center">
            <Form.Root className="w-[700px] h-[500px] p-4 border border-blue-500 rounded-lg bg-blue-100 relative overflow-y-scroll">
                <h1 className="text-lg font-semibold mb-4">Abrir um chamado</h1>
                
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <Form.Paragrafo  
                            key={index}
                            className={`relative h-12 pl-14  rounded-tl-2xl shadow-md ${
                                msg.type === 'user'
                                    ? 'bg-blue-500 text-white left-[300px] flex justify-start  pl-[15px]  w-[350px] rounded-[15px]'
                                    : 'bg-linear-to-r/srgb from-primary-100 to-primary-150 text-amber-50 self-end w-[350px] ml-2.5 rounded-[15px]'
                            }`}
                        >
                            {msg.type === 'bot' && (
                                <img 
                                    className="absolute -top-5 -left-5 h-14 w-14 rounded-full border-2 border-amber-50"  
                                    src="/image/chatAmalfis/amalfiszinho.png" 
                                    alt="amalfiszinho" 
                                />
                            )}
                            <span className={msg.loading ? "animate-pulse" : ""}>
                                {msg.text}
                            </span>
                            <span className="absolute bottom-1 right-2 text-sm text-amber-50">{msg.time}</span>
                        </Form.Paragrafo>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </Form.Root>
            <div className="flex justify-center gap-4 bottom-0 w-[90%] p-3">
                <input 
                    className="border-2 rounded-2xl border-[1px] p-1 w-[90%]" 
                    value={messageUser} 
                    type="text" 
                    placeholder="Digite sua mensagem"
                    onChange={(e) => setMessageUser(e.target.value)}
                />
                <Send className="bg-primary-100 w-[50px] h-[35px] p-1 rounded-[10px]" onClick={handleMessage} />
            </div>
        </div>
    );
}
