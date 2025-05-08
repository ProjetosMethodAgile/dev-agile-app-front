// src/components/HelpDesk/relatorio/ChartsGrid.tsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { KanbanHistory } from "@/types/api/apiTypes";

// você vai precisar transformar os dados brutos em série de pontos:
// aqui estão exemplos de transformação inline; adapte conforme seu shape real.
function buildResolutionOverTime(data: KanbanHistory[]) {
  // agrupa por dia (ou mês) e calcula média de tempo de resolução
  const map: Record<string, { sum: number; count: number }> = {};
  data.forEach((h) => {
    const day = new Date(h.created_at).toLocaleDateString();
    const duration = 1; /* sua lógica pra obter duração em minutos */
    if (!map[day]) map[day] = { sum: 0, count: 0 };
    map[day].sum += duration;
    map[day].count += 1;
  });
  return Object.entries(map).map(([name, { sum, count }]) => ({
    name,
    value: Math.round(sum / count),
  }));
}

function buildVolumeByAttendant(data: KanbanHistory[]) {
  const map: Record<string, number> = {};
  data.forEach((h) => {
    const who = h.changed_by ?? "Sistema";
    map[who] = (map[who] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

function buildStatusDistribution(data: KanbanHistory[]) {
  const map: Record<string, number> = {};
  data.forEach((h) => {
    map[h.column_atual] = (map[h.column_atual] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

interface Props {
  data: KanbanHistory[];
}

export default function ChartsGrid({ data }: Props) {
  const lineData = buildResolutionOverTime(data);
  const barData = buildVolumeByAttendant(data);
  const pieData = buildStatusDistribution(data);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Gráfico de Linha */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Tempo de Resolução ao Longo do Tempo</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={lineData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Minutos" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Volume de Chamados por Atendente</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={barData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Chamados" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Distribuição de Chamados por Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mantém o heatmap como estava */}
      <div className="hart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Calendário de Chamados Criados</h3>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded text-xs"
              style={{
                background: ["#1b5e20", "#2e7d32", "#4caf50", "#81c784"][
                  Math.floor(Math.random() * 4)
                ],
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
