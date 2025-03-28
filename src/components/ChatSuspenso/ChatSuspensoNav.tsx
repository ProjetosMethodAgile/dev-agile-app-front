"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { SetorHelpDesk } from "@/types/api/apiTypes";
import { useViewChatSuspenso } from "./ActionChatSuspenso/useViewChatSuspenso";
import { FluxoChatSuspenso } from "./ActionChatSuspenso/FluxoChatSuspenso";

type NavBarProps = React.ComponentProps<"nav"> & {
  setores: SetorHelpDesk[];
};

export default function ChatSuspensoNav({
  setores,
  className,
  ...props
}: NavBarProps) {
  const { etapaAtual, motivo } = useGlobalContext();
  const handleSendMessagechatSuspenso = useViewChatSuspenso();

  if (etapaAtual === 0 || etapaAtual === 2) {
    return (
      <nav
        className={twMerge(
          " dark:border-primary-600/70 border-primary-300 flex flex-col gap-6 overflow-hidden rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl max-lg:mt-0 max-sm:min-w-full dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl",
          className,
        )}
        {...props}
      >
        <h1 className="p-1 text-center text-lg text-[1.1rem] font-semibold text-gray-900 dark:text-gray-100">
          {FluxoChatSuspenso[motivo ? 1 : 2].title}
        </h1>
        {etapaAtual === 0 && (
          <div className="flex flex-col gap-5 overflow-y-scroll">
            {setores?.map((setor) => (
              <Form.InputSubmit
                id={setor.id}
                key={setor.nome}
                value={setor.nome}
                onClick={(e) => handleSendMessagechatSuspenso(setor.nome, e)}
                className="flex h-15 items-center justify-center overflow-hidden rounded-[5px] p-5 text-[15px]"
              >
                {setor.nome}
              </Form.InputSubmit>
            ))}
          </div>
        )}

        {etapaAtual === 2 && (
          <div className="animate-move-left-to-right flex h-full w-50 flex-col gap-5 overflow-y-scroll p-1">
            {motivo && motivo.length > 0 ? (
              motivo.map((motivoItem: string, index: number) => (
                <Form.InputSubmit
                  id={`motivo-${index}`}
                  key={index}
                  value={motivoItem}
                  onClick={(e) => handleSendMessagechatSuspenso(motivoItem, e)}
                  className="flex h-15 items-center justify-center overflow-hidden rounded-[5px] p-5 text-[15px]"
                >
                  {motivoItem}
                </Form.InputSubmit>
              ))
            ) : (
              <p className="flex items-center justify-center overflow-hidden rounded-[5px] text-[15px]">
                Aviso! Nenhum motivo cadastrado pelo gestor use o campo a baixo
                para digitar o motivo
              </p>
            )}
          </div>
        )}
      </nav>
    );
  }
  return null;
}
