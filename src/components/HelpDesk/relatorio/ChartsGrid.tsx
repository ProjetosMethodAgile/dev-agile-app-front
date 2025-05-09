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
import { ChartsData } from "@/types/api/apiTypes";

interface Props {
  data: ChartsData;
}

export default function ChartsGrid({ data }: Props) {
  const {
    resolutionOverTime,
    volumeByAttendant,
    statusDistribution,
    calendarHeatmap,
  } = data;
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Tempo de Resolução */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Tempo de Resolução ao Longo do Tempo</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={resolutionOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Minutos" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume por Atendente */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Volume de Chamados por Atendente</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={volumeByAttendant}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Chamados" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição de Status */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Distribuição de Chamados por Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {statusDistribution.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Calendário */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Calendário de Chamados Criados</h3>
        <div className="flex flex-wrap gap-1">
          {calendarHeatmap.map((c) => (
            <div
              key={c.date}
              className="flex h-6 w-6 items-center justify-center rounded text-xs"
              style={{
                background:
                  COLORS[
                    Math.floor(
                      (c.count /
                        Math.max(...calendarHeatmap.map((m) => m.count))) *
                        COLORS.length,
                    )
                  ],
              }}
            >
              {new Date(c.date).getDate()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
