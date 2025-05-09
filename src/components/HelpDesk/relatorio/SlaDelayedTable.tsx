// src/components/HelpDesk/relatorio/SlaDelayedTable.tsx
"use client";

import React from "react";
import { OverdueCard } from "@/types/api/apiTypes";

interface Props {
  data: OverdueCard[];
}

export default function SlaDelayedTable({ data }: Props) {
  return (
    <div className="table-box mirror-container">
      <h3 className="mb-2">Chamados com SLA Atrasado</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Card ID</th>
            <th className="py-2">Criado em</th>
            <th className="py-2">Atraso (min)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h) => (
            <tr key={h.card_id} className="border-b border-[#223057]">
              <td className="w-32 truncate py-2 text-blue-400">{h.card_id}</td>
              <td className="py-2">
                {new Date(h.created_at).toLocaleDateString()}
              </td>
              <td className="py-2 text-red-400">{h.delayMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
