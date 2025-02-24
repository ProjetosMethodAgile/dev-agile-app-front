"use client"
import React, { useState } from 'react';
import { Form } from '../form';

type Message = {
    text: string;
    time: string;
    type: 'user' | 'bot';
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Olá, qual seu nome?", time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), type: 'bot' }
    ]);
    const [messageUser, setMessageUser]= useState("")

    const sendMessage = (newMessage: string, type: 'user' | 'bot') => {
        setMessages(prevMessages => [
            ...prevMessages, 
            { text: newMessage, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), type }
        ]);
    };

    const handleMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const message = e.target.value
        setMessageUser(message)
        sendMessage(message, 'user');
        setTimeout(() => sendMessage("Resposta do bot!", 'bot'), 1000);
    };

    return (
        <Form.Root className="w-[700px] h-[500px] p-4 border border-blue-500 rounded-lg bg-blue-100  overflow-y-scroll">
            <h1 className="text-lg font-semibold mb-4">Abrir um chamado</h1>
            
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <Form.Paragrafo 
                        key={index} 
                        className={`relative ml-12 w-[80%] h-12 pl-14 flex items-center rounded-tl-2xl shadow-md ${msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
                    >
                        <img 
                            className="absolute -top-5 -left-5 h-14 w-14 rounded-full border-2 border-amber-50"  
                            src="/image/chatAmalfis/amalfiszinho.png" 
                            alt="amalfiszinho" 
                        />
                        {msg.text}
                        <span className="absolute bottom-1 right-2 text-sm text-gray-600">{msg.time}</span>
                    </Form.Paragrafo>
                ))}
            </div>

                <input className='border-2' value={messageUser} type="text" placeholder='Digite sua mensagem' />
            <button 
                onClick={handleMessage}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Enviar Mensagem
            </button>
        </Form.Root>
    );
}
