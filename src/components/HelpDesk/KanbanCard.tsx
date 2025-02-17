"use client";
import { MessageCircle, Paperclip, User } from "lucide-react";
import React from "react";
import { useGlobalContext } from "@/context/globalContext";

export type KanbanCardProps = React.ComponentProps<"div"> & {
  titleCard: string;
};

export default function KanbanCard({ titleCard, ...props }: KanbanCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { setCard } = useGlobalContext();

  function dragCardStart(cardElement: HTMLDivElement) {
    cardElement.classList.add("opacity-10");
  }
  function dragCardEnd(cardElement: HTMLDivElement) {
    cardElement.classList.remove("opacity-10");
    // Opcional: limpar a referência se o card não foi dropado em outra coluna
    setCard(null);
  }

  return (
    <div
      id="card-kanban"
      className="bg-primary-300 mr-2 flex flex-col gap-2 rounded-2xl p-2 shadow-2xl"
      ref={cardRef}
      draggable
      onDragStart={() => {
        if (cardRef.current) {
          dragCardStart(cardRef.current);
          // Armazena a referência globalmente
          setCard(cardRef.current);
        }
      }}
      onDragEnd={() => {
        if (cardRef.current) {
          dragCardEnd(cardRef.current);
        }
      }}
      {...props}
    >
      <p id="title-card" className="text-[18px]">
        {titleCard}
      </p>
      <div id="etiquetas-kanban" className="flex flex-wrap">
        <div id="etiqueta-kanban" className="rounded-sm bg-green-600 p-1">
          etiqueta
        </div>
      </div>
      <div id="info-card" className="flex items-center justify-between">
        <div id="icons-card" className="flex gap-3">
          <div>
            <MessageCircle />
            <span>3</span>
          </div>
          <div>
            <Paperclip />
            <span>1</span>
          </div>
        </div>
        <div id="user">
          <User />
        </div>
      </div>
    </div>
  );
}
