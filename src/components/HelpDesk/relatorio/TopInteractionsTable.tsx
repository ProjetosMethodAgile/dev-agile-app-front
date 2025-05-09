// src/components/HelpDesk/relatorio/TopInteractionsTable.tsx
"use client";

import React from "react";
import { InteractionCard } from "@/types/api/apiTypes";

interface Props {
  data: InteractionCard[];
}

export default function TopInteractionsTable({ data }: Props) {
  return (
    <div className="table-box mirror-container">
      <h3 className="mb-2">Top 5 Chamados com Mais Interações</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Card ID</th>
            <th className="py-2">Interações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h) => (
            <tr key={h.card_id} className="border-b border-[#223057]">
              <td className="w-32 truncate py-2 text-blue-400">{h.card_id}</td>
              <td className="py-2">{h.interactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
