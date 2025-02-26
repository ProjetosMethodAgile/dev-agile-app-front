"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Form } from "../form";
import iconsMap from "@/utils/iconsMap";
import { useGlobalContext } from "@/context/globalContext";
import { useHandleSendMessage } from "./ChatFunction/useHandleSendMessage";
import { Send } from "lucide-react";
interface ChatbotInputProps extends React.ComponentProps<"div"> {}

export default function ChatbotInput({ className, ...props }: ChatbotInputProps) {
  const {setMessageUser,messageUser,etapaAtual} = useGlobalContext()
  const handleSendMessage = useHandleSendMessage();
  if (etapaAtual == 1 || etapaAtual === 2) {
    return null
}
  return (
    <div className={twMerge("mt-2", className)} {...props}>
      <input
          className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-100 dark:placeholder:text-gray-600"
  
        type="text"
        value={messageUser}
        placeholder="Digite sua mensagem"
        onChange={(e) =>   setMessageUser((e.target as HTMLInputElement).value)}
      
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />

      <Send className="mr-5 bg-primary-100 h-[40px] w-[60px] p-1 rounded-2xl" onClick={()=> handleSendMessage()}/>
    </div>
  );
}

