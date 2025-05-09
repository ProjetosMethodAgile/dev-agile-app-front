// components/TopInteractionsTable.tsx

import { KanbanHistory } from "@/types/api/apiTypes";
import React from "react";

interface Props {
  data: KanbanHistory[];
}

export default function TopInteractionsTable({ data }: Props) {
  const top5 = data.slice(0, 5); // Exemplo

  return (
    <div className="table-box mirror-container">
      <h3 className="mb-2">Top 5 Chamados com Mais Interações</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Card ID</th>
            <th className="py-2">Status</th>
            <th className="py-2">Interações</th>
          </tr>
        </thead>
        <tbody>
          {top5.map((h) => (
            <tr key={h.id} className="border-b border-[#223057]">
              <td className="w-32 truncate py-2 text-blue-400">{h.card_id}</td>
              <td className="py-2">
                <span className={`badge status-${h.column_atual}`}>
                  {h.column_atual}
                </span>
              </td>
              <td className="py-2">—</td> {/* placeholder */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
