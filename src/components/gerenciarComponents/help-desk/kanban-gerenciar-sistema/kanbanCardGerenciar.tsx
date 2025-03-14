"use client";
import { MessageCircle, Paperclip, User } from "lucide-react";
import React from "react";

export type KanbanCardGerenciarProps = React.ComponentProps<"div"> & {
  titleCard: string;
};

export default function KanbanCardGerenciar({
  titleCard,
  ...props
}: KanbanCardGerenciarProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      id="card-kanban"
      className="bg-primary-300 mr-2 flex flex-col gap-2 rounded-2xl p-2 shadow-2xl"
      ref={cardRef}
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
