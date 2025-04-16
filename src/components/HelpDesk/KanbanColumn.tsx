// src/app/KanbanColumn.tsx
"use client";
import putPosicaoCardColumnid from "@/actions/HelpDesk/putPosicaoCardColumnid";
import { useGlobalContext } from "@/context/globalContext";
import { identificaAcao } from "@/functions/helpdesk/acoes_helpdesk";
import { ColumnsHelpDesk } from "@/types/api/apiTypes";
import { Plus } from "lucide-react";
import React from "react";

export type KanbanColumnProps = React.ComponentProps<"div"> & {
  title: string;
  column: ColumnsHelpDesk;
  children: React.ReactNode;
  // Novo prop para atualizar o estado do card ao soltar
  onCardDrop?: (cardId: string, newColumnId: string) => void;
};

export default function KanbanColumn({
  children,
  title,
  column,
  onCardDrop,
  ...props
}: KanbanColumnProps) {
  const { card, setCard } = useGlobalContext();
  const cardList = React.useRef<HTMLDivElement>(null);
  const dragCounter = React.useRef(0);

  async function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current = 0;
    e.currentTarget.classList.remove("bg-primary-500");

    if (card) {
      const cardId = card.getAttribute("data-card-id");
      if (cardId) {
        // Atualiza a posição do card no backend
        const result = await putPosicaoCardColumnid(cardId, column.id);
        if (!result.ok) {
          console.error("Erro ao atualizar coluna do card:", result.error);
        } else {
          if (onCardDrop) {
            if (column.ColumnAcoes.length) {
              const idAcoes = column.ColumnAcoes.map((a) => a.id);
              const nomeAcoes = column.ColumnAcoes.map((a) => a.nome);
              const response = await identificaAcao({
                idAcoes: idAcoes,
                nomeAcoes: nomeAcoes,
              });
              console.log(response);
            }
            onCardDrop(cardId, column.id);
          }
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
  console.log(column);

  return (
    <div
      className="border-primary-600 flex h-full max-w-70 min-w-70 flex-col gap-4 overflow-hidden rounded-3xl border bg-black/20 p-3 backdrop-blur-2xl"
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
