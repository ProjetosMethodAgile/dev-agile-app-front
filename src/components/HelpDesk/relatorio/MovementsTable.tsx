// src/components/HelpDesk/relatorio/MovementsTable.tsx
"use client";

import React, { useState } from "react";
import { MovementsResponse } from "@/types/api/apiTypes";

interface Props {
  response: MovementsResponse;
  onPageChange: (newPage: number) => void;
  onFilterTitle: (search: string) => void;
}

export default function MovementsTable({
  response,
  onPageChange,
  onFilterTitle,
}: Props) {
  const { total, page, pageSize, movements } = response;
  const totalPages = Math.ceil(total / pageSize);
  const [search, setSearch] = useState("");

  return (
    <div className="mirror-container table-box overflow-x-auto">
      <h3 className="mb-2">Movimentações Recentes</h3>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Pesquisar título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-l border p-2"
        />
        <button
          onClick={() => onFilterTitle(search.trim())}
          className="rounded-r bg-blue-600 px-4 text-white"
        >
          Buscar
        </button>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Data</th>
            <th className="py-2">Card ID</th>
            <th className="py-2">Título</th>
            <th className="py-2">Ação</th>
            <th className="py-2">De → Para</th>
            <th className="py-2">Quem</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((h) => (
            <tr key={h.id} className="border-b border-[#223057]">
              <td className="py-2">
                {new Date(h.created_at).toLocaleString()}
              </td>
              <td className="w-32 truncate py-2 text-blue-400">{h.card_id}</td>
              <td className="py-2">{h.title}</td>
              <td className="py-2">{h.action}</td>
              <td className="py-2">
                {h.previous_column} → {h.column_atual}
              </td>
              <td className="py-2">{h.who}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
