// src/components/HelpDesk/relatorio/FiltersSidebar.tsx
"use client";

import React from "react";
import { Movement } from "@/types/api/apiTypes";

interface Props {
  data: Movement[];
}

export default function FiltersSidebar({ data }: Props) {
  // garante sempre array de strings
  const sectors = Array.from(
    new Set(
      data.map((h) => h.previous_column).filter((s): s is string => Boolean(s)),
    ),
  );
  const attendants = Array.from(
    new Set(data.map((h) => h.who).filter((w): w is string => Boolean(w))),
  );

  const total = data.length;
  const inProgress = data.filter(
    (h) => h.column_atual === "Em Andamento",
  ).length;
  const done = data.filter((h) => h.column_atual === "Encerrado").length;
  const late = data.filter(() => false).length;

  return (
    <aside className="mirror-container w-full rounded-2xl p-6 shadow-lg md:w-64">
      <h2 className="mb-4 text-xl font-semibold">Filtros</h2>

      <label className="mb-2 block">Setor</label>
      <select className="mb-4 w-full rounded bg-[#223057] p-2">
        <option key="all">Todos os setores</option>
        {sectors.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label className="mb-2 block">Atendente</label>
      <select className="mb-6 w-full rounded bg-[#223057] p-2">
        <option key="all">Todos os atendentes</option>
        {attendants.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <h3 className="mb-2 text-lg font-medium text-gray-400">Resumo</h3>
      <div className="text-sm text-gray-200">
        <div className="mb-1 flex justify-between">
          <span>Total de chamados:</span>
          <span>{total}</span>
        </div>
        <div className="mb-1 flex justify-between">
          <span>Em andamento:</span>
          <span>{inProgress}</span>
        </div>
        <div className="mb-1 flex justify-between">
          <span>Concluídos:</span>
          <span>{done}</span>
        </div>
        <div className="flex justify-between">
          <span>Atrasados:</span>
          <span className="text-red-400">{late}</span>
        </div>
      </div>
    </aside>
  );
}
