"use client";
import { MessageCircle, Paperclip } from "lucide-react";
import React from "react";
import { useGlobalContext } from "@/context/globalContext";
import { CardHelpDesk } from "@/types/api/apiTypes";
import getIniciaisNome from "@/utils/getIniciaisNome";

export type KanbanCardProps = React.ComponentProps<"div"> & {
  card: CardHelpDesk;
  cardId: string;
  openCard: React.MouseEventHandler<HTMLDivElement>;
};

export default function KanbanCard({
  card,
  cardId,
  openCard,
  ...props
}: KanbanCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { setCard } = useGlobalContext();

  function dragCardStart(cardElement: HTMLDivElement) {
    cardElement.classList.add("opacity-10");
  }
  function dragCardEnd(cardElement: HTMLDivElement) {
    cardElement.classList.remove("opacity-10");
    setCard(null);
  }

  return (
    <div
      data-card-id={cardId}
      data-original-column={card.column_id} // <-- adiciona aqui
      className="bg-primary-300 mr-2 flex flex-col gap-2 rounded-2xl p-2 shadow-2xl"
      ref={cardRef}
      draggable
      onDragStart={() => {
        if (cardRef.current) {
          dragCardStart(cardRef.current);
          setCard(cardRef.current);
        }
      }}
      onDragEnd={() => {
        if (cardRef.current) {
          dragCardEnd(cardRef.current);
        }
      }}
      onClick={openCard}
      {...props}
    >
      <p className="text-[18px]">{card.titulo_chamado}</p>
      <div className="flex flex-wrap">
        <span
          className="rounded-sm p-1 text-sm font-medium text-white"
          style={{ backgroundColor: card.status.color || "#6B7280" }}
        >
          {card.status.nome}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="flex gap-1">
            <MessageCircle />
            <span>{card.messagesCount}</span>
          </div>
          <div className="flex gap-1">
            <Paperclip />
            <span>{card.attachmentsCount}</span>
          </div>
        </div>
        <div className="flex max-w-[90px] overflow-x-auto">
          {card.CardSessao.atendentesVinculados.map((atendente) => (
            <p
              key={atendente.KanbanSessoesAtendentes.atenden}
              className="rounded-full bg-gray-600 p-1 font-bold hover:bg-gray-500"
              title={atendente.UsuarioAtendente?.nome}
            >
              {getIniciaisNome(atendente?.UsuarioAtendente?.nome)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
