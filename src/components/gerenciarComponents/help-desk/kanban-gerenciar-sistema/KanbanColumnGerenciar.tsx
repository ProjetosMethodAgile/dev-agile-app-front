"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Plus } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export type KanbanColumnGerenciarProps = React.ComponentProps<"div"> & {
  title: string;
  children: React.ReactNode;
};

export default function KanbanColumnGerenciar({
  children,
  title,
  className,
  ...props
}: KanbanColumnGerenciarProps) {
  const { card, setCard } = useGlobalContext();
  const cardList = React.useRef<HTMLDivElement>(null);
  // Contador para monitorar entradas e saídas no container inteiro
  const dragCounter = React.useRef(0);

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

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragCounter.current = 0;
    e.currentTarget.classList.remove("bg-primary-500");

    if (cardList.current && card) {
      // Remove o card do container atual, se existir
      card.parentElement?.removeChild(card);
      // Adiciona o card à lista desta coluna
      cardList.current.appendChild(card);
      setCard(null);
    }
  }

  return (
    <div
      id="column-kanban"
      className={twMerge(
        `border-primary-600 flex h-full min-w-70 flex-col gap-4 overflow-hidden rounded-3xl border bg-black/20 p-3 backdrop-blur-2xl`,
        className,
      )}
      // Usando os eventos de captura para que a coluna inteira reaja,
      // mesmo que o cursor passe sobre os cards filhos
      onDragOverCapture={(e) => e.preventDefault()}
      onDragEnterCapture={dragHoverStart}
      onDragLeaveCapture={dragHoverEnd}
      onDropCapture={dropHandler}
      {...props}
    >
      <div
        id="title-kanban"
        className="flex justify-between text-2xl font-medium"
      >
        <h2>{title}</h2>
        <button id="add-card" className="cursor-pointer">
          <Plus className="bg-primary-500 active:bg-primary-500/50 rounded-lg" />
        </button>
      </div>
      <div
        id="cards-kanban"
        className="flex h-full flex-col gap-2 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out"
        ref={cardList}
      >
        {children}
      </div>
    </div>
  );
}
