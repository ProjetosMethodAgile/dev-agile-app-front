"use client";

import React, { useState, useEffect } from "react";
import getDashboardCreated from "@/actions/HelpDesk/relatorio/getDashboardCreated";
import getDashboardCalendar from "@/actions/HelpDesk/relatorio/getDashboardCalendar";
import { CreatedCard } from "@/types/api/apiTypes";

interface HeatmapEntry {
  date: string;
  count: number;
}

// Gera matriz de semanas para mês/ano
function getMonthData(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export default function CreatedCalendar() {
  const [heatmap, setHeatmap] = useState<HeatmapEntry[]>([]);
  const [viewDate, setViewDate] = useState<string | null>(null);
  const [cards, setCards] = useState<CreatedCard[] | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthData = getMonthData(year, month);

  // mapeia datas para counts
  const dataMap = new Map(heatmap.map((h) => [h.date, h.count]));

  // ao mudar mês, recarrega heatmap via server action
  useEffect(() => {
    const ym = currentDate.toISOString().slice(0, 7); // "YYYY-MM"
    getDashboardCalendar({ de: ym, ate: ym }).then((res) => {
      if (res.ok) setHeatmap(res.data);
      else setHeatmap([]);
    });
  }, [currentDate]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const loadDay = async (date: string) => {
    setViewDate(date);
    const result = await getDashboardCreated(date);
    if (result.ok) setCards(result.data);
    else setCards([]);
  };

  // Se estiver em “modo lista”, exibe os chamados daquele dia
  if (viewDate && cards !== null) {
    return (
      <div>
        <button
          className="mb-2"
          onClick={() => {
            setViewDate(null);
            setCards(null);
          }}
        >
          ← Voltar ao calendário
        </button>
        <h4 className="font-semibold">Chamados em {viewDate}</h4>
        <ul className="mt-2">
          {cards.length ? (
            cards.map((c) => (
              <li key={c.id} className="border-b p-2">
                <strong>{c.title}</strong>
                <br />
                Cliente: {c.cliente} — Setor: {c.setor} — Motivo:{" "}
                {c.motivo || "-"}
              </li>
            ))
          ) : (
            <li>Nenhum chamado criado neste dia.</li>
          )}
        </ul>
      </div>
    );
  }

  // Modo calendário
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button onClick={prevMonth}>‹</button>
        <span className="font-semibold capitalize">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={nextMonth}>›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Cabeçalho dos dias da semana com keys únicas */}
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <div key={`weekday-${i}`} className="font-medium">
            {d}
          </div>
        ))}

        {/* Dias do mês */}
        {monthData.map((week, wIdx) =>
          week.map((day, dIdx) => {
            const dateStr = day?.toISOString().slice(0, 10) || "";
            const count = dataMap.get(dateStr) || 0;
            return (
              <div
                key={`${wIdx}-${dIdx}`}
                className="flex h-12 cursor-pointer flex-col justify-between rounded border p-1 hover:bg-gray-100"
                onClick={() => day && loadDay(dateStr)}
              >
                <span className="text-right text-xs">
                  {day?.getDate() || ""}
                </span>
                <span className="mx-auto text-sm font-semibold">
                  {count || ""}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
