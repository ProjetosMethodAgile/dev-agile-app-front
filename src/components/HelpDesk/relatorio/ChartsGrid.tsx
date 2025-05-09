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
import CreatedCalendar from "@/components/HelpDesk/relatorio/CreatedCalendar";

interface Props {
  data?: ChartsData;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

export default function ChartsGrid({ data }: Props) {
  const {
    resolutionOverTime = [],
    volumeByAttendant = [],
    statusDistribution = [],
  } = data || {};

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
            <Tooltip
              labelFormatter={(label) => `Atendente: ${label}`}
              formatter={(value) => [`${value}`, "Chamados"]}
            />
            <Legend />
            <Bar dataKey="value" name="Chamados">
              {volumeByAttendant.map((_, idx) => (
                <Cell key={idx} fill={getRandomColor()} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição de Status */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Distribuição de Chamados por Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
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

      {/* Calendário de Chamados Criados */}
      <div className="chart-box mirror-container rounded-2xl p-4 shadow-lg">
        <h3 className="mb-2">Calendário de Chamados Criados</h3>
        <CreatedCalendar />
      </div>
    </section>
  );
}
