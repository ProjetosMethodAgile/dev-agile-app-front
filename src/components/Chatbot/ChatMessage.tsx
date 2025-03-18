"use client";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useGlobalContext } from "@/context/globalContext";
import { useHandleSendMessage } from "./ChatFunction/useHandleSendMessage";
import Image from "next/image";
interface ChatMessagesProps extends React.ComponentProps<"nav"> {
  someProp?: string; 
}


export default  function ChatMessages({ className, ...props }: ChatMessagesProps) {
  const { messages,etapaAtual,countdown } = useGlobalContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const handleSendMessage = useHandleSendMessage();
  const amalfiszinho = "/image/chatAmalfis/amalfiszinho.png";


  useEffect(() => {
 
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

if(countdown !== null ) {
return(

  <nav className="dark:bg-primary-300 fixed inset-0 flex items-center justify-center rounded-[15px]">
      <h2 className="text-4xl text-white">Finalizando em {countdown}...</h2>
  </nav>
    )

}

return (
  <nav
    className={twMerge(
      `animate-move-left-to-right
       flex min-h-[115px] flex-col gap-6
       rounded-3xl border-2 border-primary-300
       bg-transparent p-5 backdrop-blur-2xl
       max-sm:min-w-full
       w-1/1
       dark:border-primary-600/70
       dark:bg-black/20 dark:backdrop-blur-2xl
       overflow-y-scroll
       min-h-115
       `,
      className
    )}
    {...props}
  >
  
    {messages.map((msg, index) => (
      <div 
        key={index}
        className={
          msg.loading
            ? ""
            : `
            relative flex w-[400px] gap-1 rounded-tl-2xl 
            border border-amber-50 p-6 pl-[60px] break-words 
            shadow-md ${
              msg.type === "user"
                ? "ml-auto justify-end rounded-r-[15px] rounded-br-[50px] bg-blue-500 text-white"
                : "animate-move-right-to-left from-primary-100 to-primary-150 rounded-[15px] rounded-r-[15px] rounded-bl-[50px] bg-linear-to-r/srgb text-amber-50"
            }`
        }
      >
        {msg.type === "bot" && !msg.loading && (
         <Image
         src={amalfiszinho}
         alt="amalfiszinho"
         width={70}
         height={70}
         className="absolute -top-2 -left-1 h-14 w-14 rounded-full border-2 border-amber-50"
       />
        
        )}
        <span className={msg.loading ? "animate-pulse" : "max-w-[350px] text-wrap"}>
          {msg.text}
          {etapaAtual === 4 && index === messages.length - 1 && (
            <div className="flex gap-2 p-5">
              <button
                className="w-[100px] rounded-[15px] bg-red-500 p-3"
                value="voltar"
                onClick={(e) => handleSendMessage(e.currentTarget.value)}
              >
                Voltar
              </button>
              <button
                className="w-[100px] rounded-[15px] bg-green-500 p-3"
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
      </div>
    ))}
    
    {/* Div que serve de referência para rolar para a última mensagem */}
    <div ref={messagesEndRef} />
  </nav>
);
}