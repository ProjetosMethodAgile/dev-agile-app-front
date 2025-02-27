"use client";

import { twMerge } from "tailwind-merge";
import { useGlobalContext } from "@/context/globalContext";
import { useHandleSendMessage } from "./ChatFunction/useHandleSendMessage";
import { Send } from "lucide-react";


export default function ChatbotInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setMessageUser, messageUser, etapaAtual } = useGlobalContext();
  const handleSendMessage = useHandleSendMessage();
  if (etapaAtual === 1 || etapaAtual === 2) {
    return null;
  }



  return (
    <div className={twMerge("mt-2", className)} {...props}>
      <input
        className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-600"
        type="text"
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
        className="bg-primary-100 mr-5 h-[40px] w-[60px] rounded-2xl p-1"
        onClick={() => handleSendMessage()}
      />
    </div>
  );
}
