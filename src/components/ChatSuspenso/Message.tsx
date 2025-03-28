import { useGlobalContext } from "@/context/globalContext";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useViewChatSuspenso } from "./ActionChatSuspenso/useViewChatSuspenso";

type Message = {
  text: string;
  time: string;
  type: "user" | "bot";
  loading?: boolean;
};

export function Message() {
  const { messagesLogado, etapaAtual } = useGlobalContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const amalfiszinho = "/image/chatAmalfis/amalfiszinho.png";
  const handleSendMessagechatSuspenso = useViewChatSuspenso();

  // Sempre que messagesLogado mudar, rola até a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesLogado]);

  return (
    <div className="h-110 overflow-auto overflow-x-hidden rounded-sm p-10">
      {messagesLogado.map((msg, index) => (
        <div
          key={index}
          className={
            msg.loading
              ? ""
              : `relative flex w-[400px] gap-1 rounded-tl-2xl border border-amber-50 p-6 pl-[60px] break-words shadow-md ${
                  msg.type === "user"
                    ? "animate-move-left-to-right mt-3 ml-auto justify-end rounded-r-[15px] rounded-br-[50px] bg-blue-500 text-white duration-[2000ms]"
                    : "animate-move-right-to-left from-primary-100 to-primary-150 mt-3 rounded-[15px] rounded-r-[15px] rounded-bl-[50px] bg-linear-to-r/srgb text-amber-50 duration-[500ms]"
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
          <span
            className={
              msg.loading
                ? "animate-pulse"
                : "max-w-[350px] overflow-hidden text-wrap"
            }
          >
            {msg.text}
            {etapaAtual === 4 &&
              etapaAtual < 5 &&
              index === messagesLogado.length - 1 && (
                <div className="flex gap-2 p-5">
                  <button
                    className="w-[100px] rounded-[15px] bg-red-500 p-3"
                    value="voltar"
                    onClick={(e) =>
                      handleSendMessagechatSuspenso(e.currentTarget.value)
                    }
                  >
                    Voltar
                  </button>
                  <button
                    className="w-[100px] rounded-[15px] bg-green-500 p-3"
                    value="Finalizar"
                    onClick={(e) =>
                      handleSendMessagechatSuspenso(e.currentTarget.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessagechatSuspenso();
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
      {/* Div de referência para rolar até a última mensagem */}
      <div ref={messagesEndRef} />
    </div>
  );
}
