"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { setores } from "./setores";
import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useHandleSendMessage } from "./ChatFunction/useHandleSendMessage";


type NavBarProps = React.ComponentProps<"nav">;

export default function ChatbotNavBar({ className, ...props }: NavBarProps) {
  const { etapaAtual, setorSelecionado,title } = useGlobalContext();
  const handleSendMessage = useHandleSendMessage();
 
  if (etapaAtual == 1 || etapaAtual === 2) {



    return (
      <nav
        className={twMerge(
          ` animate-move-left-to-right dark:border-primary-600/70 border-primary-300 bg-transparent flex min-h-115 flex-col gap-6 rounded-3xl border-2 p-5 backdrop-blur-2xl max-lg:mt-0 max-sm:min-w-full dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl`,
          className
        )}
        {...props}
      >
        <h1 className="p-5 text-center text-lg text-[1.2rem] font-semibold text-gray-900 dark:text-gray-100">
        {title}
        </h1>
        {etapaAtual === 1 && (
          <div className="flex flex-col gap-1.5">
            {setores.map((setor) => (
              <Form.InputSubmit className="p-2 h-10 flex items-center justify-center"
                key={setor.nome}
                value={setor.nome}
                onClick={() => handleSendMessage(setor.nome)}
              >
                {setor.nome}
              </Form.InputSubmit>
            ))}
          </div>
        )}

        {etapaAtual === 2 && setorSelecionado && (
          <div className="flex flex-col gap-1.5">
            {setorSelecionado?.motivo.map((motivo: string, index: number) => (
              <Form.InputSubmit
                key={index}
                value={motivo}
                onClick={() => handleSendMessage(motivo)}
              >
                {motivo}
              </Form.InputSubmit>
            ))}
          </div>
        )}
      </nav>
    );
  }
  return null; // Não renderiza o Navbar
}
