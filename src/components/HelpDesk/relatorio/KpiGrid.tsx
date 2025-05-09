// src/components/HelpDesk/relatorio/KpiGrid.tsx
"use client";

import React from "react";
import { Summary } from "@/types/api/apiTypes";

interface Props {
  summary: Summary;
}

export default function KpiGrid({ summary }: Props) {
  const {
    total,
    open,
    inProgress,
    done,
    late,
    avgResolutionTime,
    slaRate,
    avgInteractions,
  } = summary;

  const items = [
    {
      icon: "fa-clock",
      title: "Tempo Médio de Resolução (min)",
      value: `${avgResolutionTime.toFixed(0)}`,
      note: "",
    },
    {
      icon: "fa-shield-alt",
      title: "Taxa de SLA Cumprido (%)",
      value: `${slaRate.toFixed(2)}%`,
      note: "",
    },
    {
      icon: "fa-tasks",
      title: "Abertos x Fechados",
      value: `${open} / ${done}`,
      note: "",
    },
    {
      icon: "fa-comments",
      title: "Interações / Chamado",
      value: `${avgInteractions.toFixed(2)}`,
      note: "",
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
