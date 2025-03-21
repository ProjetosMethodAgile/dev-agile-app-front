"use client";
import putPosicaoCardColumnid from "@/actions/HelpDesk/putPosicaoCardColumnid";
import { useGlobalContext } from "@/context/globalContext";
import { Plus } from "lucide-react";
import React from "react";

export type KanbanColumnProps = React.ComponentProps<"div"> & {
  title: string;
  columnId: string;
  children: React.ReactNode;
};

export default function KanbanColumn({
  children,
  title,
  columnId,
  ...props
}: KanbanColumnProps) {
  const { card, setCard } = useGlobalContext();
  const cardList = React.useRef<HTMLDivElement>(null);
  const dragCounter = React.useRef(0);

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current = 0;
    e.currentTarget.classList.remove("bg-primary-500");

    if (cardList.current && card) {
      // Remove o card do container atual
      card.parentElement?.removeChild(card);
      // Adiciona o card à lista desta coluna
      cardList.current.appendChild(card);

      // Obtém o card_id do atributo data-card-id
      const cardId = card.getAttribute("data-card-id");
      if (cardId) {
        const result = await putPosicaoCardColumnid(cardId, columnId);
        if (!result.ok) {
          console.error("Erro ao atualizar coluna do card:", result.error);
        }
      }
      setCard(null);
    }
  }

  function dragHoverStart(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      e.currentTarget.classList.add("bg-primary-500");
    }
  }

  function dragHoverEnd(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove("bg-primary-500");
    }
  }

  return (
    <div
      className="border-primary-600 flex h-full min-w-70 flex-col gap-4 overflow-hidden rounded-3xl border bg-black/20 p-3 backdrop-blur-2xl"
      onDragOverCapture={(e) => e.preventDefault()}
      onDragEnterCapture={dragHoverStart}
      onDragLeaveCapture={dragHoverEnd}
      onDropCapture={dropHandler}
      {...props}
    >
      <div className="flex justify-between text-2xl font-medium">
        <h2>{title}</h2>
        <button id="add-card" className="cursor-pointer">
          <Plus className="bg-primary-500 active:bg-primary-500/50 rounded-lg" />
        </button>
      </div>
      <div
        className="flex h-full flex-col gap-2 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out"
        ref={cardList}
      >
        {children}
      </div>
    </div>
  );
}
