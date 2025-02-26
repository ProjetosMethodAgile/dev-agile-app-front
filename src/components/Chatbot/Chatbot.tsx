"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Form } from '../form';
import { Send } from 'lucide-react';
import NavBarMenuChat from './NavBarMenuChat';
import ToggleTheme from '../button/ToggleTheme';
import { fluxo, setores } from './setores';

type Message = {
  text: string;
  time: string;
  type: 'user' | 'bot';
  loading?: boolean;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: fluxo[0].pergunta,
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      type: 'bot'
    }
  ]);
  const [title, setTitle] = useState<string>(fluxo[0].title);
  const [messageUser, setMessageUser] = useState("");
  const [etapaAtual, setEtapaAtual] = useState<number>(0);
  const [setorSelecionado, setSetorSelecionado] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [formDataChamados, setFormDataChamados] = useState<any>({});
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Variável para armazenar as mensagens enviadas pelo usuário
  const [dataUserChamados, setDataUserChamados] = useState<string[]>([]);

  const sendMessage = (newMessage: string, type: 'user' | 'bot', loading = false) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        text: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        type,
        loading
      }
    ]);
  };

  useEffect(() => {
    console.log(formDataChamados);
    console.log("Dados enviados pelo usuário:", dataUserChamados);
  }, [formDataChamados, dataUserChamados]);

  // Efeito para a contagem regressiva
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Ao chegar a 0, recarrega a página
      window.location.reload();
    }
  }, [countdown]);

  // Quando a etapaAtual for igual a 5, salva os dados e inicia a contagem
  useEffect(() => {
    if (etapaAtual === 5 && countdown === null) {
      setTimeout(() => {
        const dadosChamado = {
          messages,
          setor: setorSelecionado,
          title,
          dataUserChamados // Aqui você inclui os dados enviados pelo usuário
        };
        setFormDataChamados(dadosChamado);
        sendMessage("Finalizando...", 'bot');
        setCountdown(5);
      }, 3500);
    }
  }, [etapaAtual, countdown, messages, setorSelecionado, title, dataUserChamados]);

  // Função genérica para enviar mensagem com tratamento especial para "Voltar"
  const handleSendMessage = (text?: string) => {
    const messageToSend = text !== undefined ? text : messageUser;
    if (!messageToSend.trim()) return;

    if (messageToSend === "Descrição") {
      sendMessage(messageToSend, 'user');
      setMessageUser("");
      // Adiciona uma mensagem de loading
      sendMessage("Escrevendo...", 'bot', true);
      setTimeout(() => {
        setMessages(prev => {
          const updated = [...prev];
          const indexLoading = updated.findIndex(msg => msg.loading);
          if (indexLoading !== -1) {
            updated[indexLoading] = {
              ...updated[indexLoading],
              text: fluxo[0].pergunta, // Retorna para a descrição inicial
              loading: false,
              time: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
            };
            // Reseta o fluxo para o início
            setEtapaAtual(0);
            setTitle(fluxo[0].title);
            setSetorSelecionado(null);
          }
          return updated;
        });
      }, 1000);
      return;
    }

    // Fluxo normal:
    // Salva a mensagem enviada pelo usuário em dataUserChamados
    setDataUserChamados(prevData => [...prevData, messageToSend]);

    sendMessage(messageToSend, 'user');
    setMessageUser("");

    const respostaUsuario = messageToSend;
    const proximaEtapa = fluxo[etapaAtual].next(respostaUsuario);

    sendMessage("Escrevendo...", 'bot', true);

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        const indexLoading = updated.findIndex(msg => msg.loading);
        if (indexLoading !== -1) {
          if (proximaEtapa !== null) {
            updated[indexLoading] = {
              ...updated[indexLoading],
              text: fluxo[proximaEtapa].pergunta,
              loading: false,
              time: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
            };
            setEtapaAtual(proximaEtapa);
            setTitle(fluxo[proximaEtapa].title);
          } else {
            updated[indexLoading] = {
              ...updated[indexLoading],
              text: "Obrigado pelas informações!",
              loading: false,
              time: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
            };
            setTitle("");
          }
        }
        return updated;
      });
    }, 1000);
  };

  // Função para tratar o clique em um setor
  const handleSendMessageSetor = (setor: any) => {
    handleSendMessage(setor.nome);
    setSetorSelecionado(setor);
  };

  useEffect(() => {
    // Scroll automático para o final da lista de mensagens
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-[800px] h-[600px] flex flex-col items-center relative">
      <div className="flex w-full h-full dark:bg-primary-900 ">
        {/* Menu lateral: Se etapaAtual for 1, exibe os setores; se for 2, exibe os motivos do setor selecionado */}
        {etapaAtual === 1 && (
          <NavBarMenuChat className="p-1.5 w-[500px] h-full bg-blue-100 dark:bg-primary-900 border-[0.5px] border-blue-500 dark:border-amber-50/60 rounded-l-[15px] border-r-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-[1.5rem] text-center p-3">
              {title}
            </h1>
            <div className="flex flex-col gap-1.5">
              {setores.map((setor) => (
                <Form.InputSubmit
                  key={setor.nome}
                  value={setor.nome}
                  onClick={() => handleSendMessageSetor(setor)}
                >
                  {setor.nome}
                </Form.InputSubmit>
              ))}
            </div>
          </NavBarMenuChat>
        )}
        {etapaAtual === 2 && setorSelecionado && (
          <NavBarMenuChat className="p-3 w-[500px] h-full bg-blue-100 dark:bg-primary-900 border-[0.5px] border-blue-500 dark:border-amber-50/60 rounded-l-[15px] border-r-0">
            <h1 className="text-lg font-semibold text-primary-100 dark:text-gray-100">
              {title}
            </h1>
            <div className="flex flex-col gap-1.5">
              {setorSelecionado.motivo.map((motivo: string, index: number) => (
                <Form.InputSubmit
                  key={index}
                  value={motivo}
                  onClick={() => handleSendMessage(motivo)}
                >
                  {motivo}
                </Form.InputSubmit>
              ))}
            </div>
          </NavBarMenuChat>
        )}

        <div className="flex flex-col w-full h-full bg-blue-100 dark:bg-primary-900 border-[0.5px] border-blue-500 dark:border-amber-50/60 rounded-[15px]">
          <header className="p-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-[1rem]">
              {title}
            </h1>
          </header>
          <div className="flex-1 p-4 overflow-y-scroll space-y-4 relative">
            {messages.map((msg, index) => (
              <Form.Paragrafo
                key={index}
                className={
                  msg.loading
                    ? ""
                    : `relative p-6 flex pl-15 rounded-tl-2xl shadow-md gap-1 break-words w-[400px] border border-amber-50 ${
                        msg.type === 'user'
                          ? 'text-wrap bg-blue-500 text-white ml-auto flex justify-end pl-[15px] rounded-r-[15px] rounded-br-[50px]'
                          : 'animate-move-right-to-left bg-linear-to-r/srgb from-primary-100 to-primary-150 text-amber-50 rounded-r-[15px] rounded-bl-[50px] rounded-[15px]'
                      }`
                }
              >
                {msg.type === 'bot' && (
                  <img
                    className={msg.loading ? "hidden" : "absolute -top-2 -left-0 h-14 w-14 rounded-full border-2 border-amber-50"}
                    src="/image/chatAmalfis/amalfiszinho.png"
                    alt="amalfiszinho"
                  />
                )}
                <span className={msg.loading ? "animate-pulse" : "text-wrap max-w-[350px]"}>
                  {msg.text}
                  {etapaAtual === 4 && index === messages.length - 1 && (
                    <div className="p-5 flex gap-2">
                      <button
                        className="bg-red-500 p-3 rounded-[15px] w-[100px]"
                        value="Descrição"
                        onClick={(e) => handleSendMessage(e.currentTarget.value)}
                      >
                        Voltar
                      </button>
                      <button
                        className="bg-green-500 p-3 rounded-[15px] w-[100px]"
                        value="Finalizar"
                        onClick={(e) => handleSendMessage(e.currentTarget.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      >
                        Finalizar
                      </button>
                    </div>
                  )}
                </span>
                <span className="absolute bottom-1 right-7 text-sm text-amber-50">
                  {msg.loading ? "" : msg.time}
                </span>
              </Form.Paragrafo>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Área de input aparece se não estiver em etapa 1 ou 2 */}
          {etapaAtual === 0 && (
            <div className="p-3">
              <div className="flex gap-4">
                <input
                  className="flex-1 rounded-2xl border-blue-500 dark:border-primary-700 p-1 bg-white dark:bg-amber-50 dark:text-gray-900"
                  value={messageUser}
                  type="text"
                  placeholder="Digite sua mensagem"
                  onChange={(e) => setMessageUser(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  required
                />
                <Send
                  tabIndex={0}
                  className="bg-primary-100 dark:bg-primary-200 w-[50px] h-[35px] p-1 rounded-[10px] cursor-pointer"
                  onClick={() => handleSendMessage()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
              </div>
            </div>
          )}
          {etapaAtual === 3 && (
            <div className="p-3">
              <div className="flex gap-4 items-center">
                <textarea
                  className="flex-1 rounded-2xl border-blue-500 dark:border-primary-700 p-1 bg-white dark:bg-amber-50 dark:text-gray-900"
                  value={messageUser}
                  placeholder="Digite sua mensagem"
                  onChange={(e) => setMessageUser(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Send
                  className="bg-primary-100 dark:bg-primary-200 w-[50px] h-[35px] p-1 rounded-[10px] cursor-pointer"
                  onClick={() => handleSendMessage()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <ToggleTheme />
      {/* Overlay para o contador de finalização */}
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-primary-300">
          <h2 className="text-4xl text-white">Finalizando em {countdown}...</h2>
        </div>
      )}
    </div>
  );
}
