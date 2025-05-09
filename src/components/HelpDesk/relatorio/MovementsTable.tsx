// src/components/HelpDesk/relatorio/MovementsTable.tsx
"use client";

import React from "react";
import { Movement } from "@/types/api/apiTypes";

interface Props {
  data: Movement[];
}

export default function MovementsTable({ data }: Props) {
  const recent = data.slice(0, 5);

  return (
    <div className="mirror-container table-box">
      <h3 className="mb-2">Movimentações Recentes</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Data</th>
            <th className="py-2">Card ID</th>
            <th className="py-2">Ação</th>
            <th className="py-2">De → Para</th>
            <th className="py-2">Quem</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((h) => (
            <tr key={h.id} className="border-b border-[#223057]">
              <td className="py-2">
                {new Date(h.created_at).toLocaleString()}
              </td>
              <td className="w-32 truncate py-2 text-blue-400">{h.card_id}</td>
              <td className="py-2">{h.action}</td>
              <td className="py-2">
                {h.previous_column} → {h.column_atual}
              </td>
              <td className="py-2">{h.changed_by ?? "Sistema"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
