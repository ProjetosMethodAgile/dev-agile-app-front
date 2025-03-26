import { Send } from 'lucide-react'
import React from 'react'
import { viewChatSuspenso } from './ActionChatSuspenso/viewChatSuspenso';
import { useGlobalContext } from '@/context/globalContext';

export function ChatInputChatSuspenso() {
  const { setMessageUser, messageUser, etapaAtual, motivo } = useGlobalContext();
  const handleSendMessagechatSuspenso = viewChatSuspenso();

  // Função auxiliar para tratar o pressionar de "Enter"
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessagechatSuspenso();
    }
  };

  if (etapaAtual === 1 || etapaAtual === 2 || etapaAtual === 5) {
    if (motivo?.length === 0) {
      return (
        <div className="flex">
          <input
            className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-600"
            type="text"
            value={messageUser}
            placeholder="Digite sua mensagem"
            onChange={(e) => setMessageUser(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Send
            className="bg-primary-100 mr-5 h-[40px] w-[60px] rounded-2xl p-1"
            onClick={(e) => {
              e.preventDefault();
              handleSendMessagechatSuspenso();
            }}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex">
      <input
        className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-600 p-7"
        type="text"
        value={messageUser}
        placeholder="Digite sua mensagem"
        onChange={(e) => setMessageUser(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Send
        className="bg-primary-100 mr-5 h-[40px] w-[60px] rounded-2xl p-1"
        onClick={(e) => {
          e.preventDefault();
          handleSendMessagechatSuspenso();
        }}
      />
    </div>
  );
}
