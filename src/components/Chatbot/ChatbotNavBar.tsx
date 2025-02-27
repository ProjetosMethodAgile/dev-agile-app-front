"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useHandleSendMessage } from "./ChatFunction/useHandleSendMessage";
import { SetorHelpDesk } from "@/types/api/apiTypes";

type NavBarProps = React.ComponentProps<"nav"> & {
  setores: SetorHelpDesk[];
};

export default function ChatbotNavBar({ setores, className, ...props }: NavBarProps) {
  const { etapaAtual, setorSelecionado, title } = useGlobalContext();
  const handleSendMessage = useHandleSendMessage();

  if (etapaAtual === 1 || etapaAtual === 2) {
    return (
      <nav
        className={twMerge(
          "animate-move-left-to-right dark:border-primary-600/70 border-primary-300 bg-transparent flex min-h-115 flex-col gap-6 rounded-3xl border-2 p-5 backdrop-blur-2xl max-lg:mt-0 max-sm:min-w-full dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl",
          className
        )}
        {...props}
      >
        <h1 className="p-5 text-center text-lg text-[1.2rem] font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {etapaAtual === 1 && (
          <div className="flex flex-col gap-5">
            {setores?.map((setor) => (
              <Form.InputSubmit
                id={setor.id}
                key={setor.nome}
                value={setor.nome}
                onClick={(e) => handleSendMessage(setor.nome, e)}
                className="p-2 h-10 flex items-center justify-center rounded-[5px]"
              >
                {setor.nome}
              </Form.InputSubmit>
            ))}
          </div>
        )}
        {etapaAtual === 2 && setorSelecionado && (
          <div className="flex flex-col gap-1.5">
            {setorSelecionado.motivo.map((motivo: string, index: number) => (
              <Form.InputSubmit
                id={`motivo-${index}`}
                key={index}
                value={motivo}
                onClick={(e) => handleSendMessage(motivo, e)}
              >
                {motivo}
              </Form.InputSubmit>
            ))}
          </div>
        )}
      </nav>
    );
  }
  return null;
}
