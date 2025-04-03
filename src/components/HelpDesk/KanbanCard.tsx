"use client";
import { MessageCircle, Paperclip, User } from "lucide-react";
import React from "react";
import { useGlobalContext } from "@/context/globalContext";

export type KanbanCardProps = React.ComponentProps<"div"> & {
  titleCard: string;
  cardId: string;
  openCard: React.MouseEventHandler<HTMLDivElement>;
};

export default function KanbanCard({
  titleCard,
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
      <p className="text-[18px]">{titleCard}</p>
      <div className="flex flex-wrap">
        <div className="rounded-sm bg-green-600 p-1">etiqueta</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div>
            <MessageCircle />
            <span>3</span>
          </div>
          <div>
            <Paperclip />
            <span>1</span>
          </div>
        </div>
        <div>
          <User />
        </div>
      </div>
    </div>
  );
}
