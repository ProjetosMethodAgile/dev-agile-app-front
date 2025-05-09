import React from "react";
import { KanbanHistory } from "@/types/api/apiTypes";

interface Props {
  data: KanbanHistory[];
}

export default function KpiGrid({ data }: Props) {
  console.log(data);

  const avgTime = "08:42";
  const slaRate = "94.3%";
  const open = 42,
    closed = 189;
  const interactions = "4.7";

  const items = [
    {
      icon: "fa-clock",
      title: "Tempo Médio de Resolução",
      value: avgTime,
      note: "↓ 12% vs mês anterior",
    },
    {
      icon: "fa-shield-alt",
      title: "Taxa de SLA Cumprido",
      value: slaRate,
      note: "↑ 3.2% vs meta",
    },
    {
      icon: "fa-tasks",
      title: "Abertos x Fechados",
      value: `${open} / ${closed}`,
      note: "81.8% resolução",
    },
    {
      icon: "fa-comments",
      title: "Interações / Chamado",
      value: interactions,
      note: "↑ 0.5 acima da média",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <div
          key={i.title}
          className="mirror-container flex items-center justify-between rounded-2xl p-6 shadow-lg transition-transform hover:-translate-y-1"
        >
          <div>
            <p className="text-sm text-gray-300">{i.title}</p>
            <h3 className="my-1 text-2xl font-bold">{i.value}</h3>
            <p className="text-xs text-green-400">{i.note}</p>
          </div>
          <div className="text-3xl text-gray-400">
            <i className={`fas ${i.icon}`}></i>
          </div>
        </div>
      ))}
    </section>
  );
}
