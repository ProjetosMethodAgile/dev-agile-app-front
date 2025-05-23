"use client";
import putPosicaoCardColumnid from "@/actions/HelpDesk/putPosicaoCardColumnid";
import { useGlobalContext } from "@/context/globalContext";
import { identificaAcao } from "@/functions/helpdesk/acoes_helpdesk";
import { ColumnsHelpDesk } from "@/types/api/apiTypes";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

export type KanbanColumnProps = React.ComponentProps<"div"> & {
  title: string;
  column: ColumnsHelpDesk;
  children: React.ReactNode;
  currentSetor: string;
  onCardDrop?: (cardId: string, newColumnId: string) => void;
};

export default function KanbanColumn({
  children,
  title,
  column,
  currentSetor,
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

    if (!card) return;
    const cardId = card.getAttribute("data-card-id");
    const originalColumn = card.getAttribute("data-original-column");

    // se não mudou de coluna, sai sem chamar o backend
    if (originalColumn === column.id) {
      setCard(null);
      return;
    }

    if (cardId) {
      const result = await putPosicaoCardColumnid(
        cardId,
        column.id,
        currentSetor,
      );
      if (!result.ok) {
        toast.error(
          "Erro ao atualizar posição do card, contate o administrador do sistema",
        );
      } else {
        // atualiza o atributo para nova coluna
        card.setAttribute("data-original-column", column.id);

        if (onCardDrop) {
          if (column.ColumnAcoes.length) {
            const nomeAcoes = column.ColumnAcoes.map((a) => a.nome);
            await identificaAcao({ nomeAcoes, column, cardId });
          }
          onCardDrop(cardId, column.id);
        }
      }
    }

    setCard(null);
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
