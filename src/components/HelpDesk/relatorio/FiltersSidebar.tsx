// src/components/HelpDesk/relatorio/FiltersSidebar.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Movement } from "@/types/api/apiTypes";

interface Props {
  data: Movement[];
}

export default function FiltersSidebar({ data }: Props) {
  const searchParams = useSearchParams();
  const de = searchParams.get("de") || "";
  const ate = searchParams.get("ate") || "";
  const setoresParam = searchParams.getAll("setores");
  const atendenteParam = searchParams.get("atendente") || "";

  // Extrai valores únicos para os selects
  const sectors = Array.from(
    new Set(
      data.map((h) => h.previous_column).filter((s): s is string => Boolean(s)),
    ),
  );
  const attendants = Array.from(
    new Set(data.map((h) => h.who).filter((w): w is string => Boolean(w))),
  );

  // Resumo
  const total = data.length;
  const inProgress = data.filter(
    (h) => h.column_atual === "Em Andamento",
  ).length;
  const done = data.filter((h) => h.column_atual === "Encerrado").length;
  const late = 0; // Aplique sua regra de cálculo de atrasados

  return (
    <aside className="mirror-container w-full rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Filtros</h2>

      <form method="get" className="flex flex-col gap-4">
        {/* Data De */}
        <div>
          <label htmlFor="de" className="block text-sm font-medium">
            De
          </label>
          <input
            id="de"
            name="de"
            type="date"
            defaultValue={de}
            className="mt-1 block w-full rounded border-gray-300 p-2"
          />
        </div>

        {/* Data Até */}
        <div>
          <label htmlFor="ate" className="block text-sm font-medium">
            Até
          </label>
          <input
            id="ate"
            name="ate"
            type="date"
            defaultValue={ate}
            className="mt-1 block w-full rounded border-gray-300 p-2"
          />
        </div>

        {/* Setores */}
        <div>
          <label htmlFor="setores" className="block text-sm font-medium">
            Setor
          </label>
          <select
            id="setores"
            name="setores"
            multiple
            defaultValue={setoresParam}
            className="mt-1 block w-full rounded border-gray-300 p-2"
          >
            <option value="">Todos os setores</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Atendente */}
        <div>
          <label htmlFor="atendente" className="block text-sm font-medium">
            Atendente
          </label>
          <select
            id="atendente"
            name="atendente"
            defaultValue={atendenteParam}
            className="mt-1 block w-full rounded border-gray-300 p-2"
          >
            <option value="">Todos os atendentes</option>
            {attendants.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-white"
        >
          Aplicar
        </button>
      </form>

      <h3 className="mt-6 mb-2 text-lg font-medium text-gray-500">Resumo</h3>
      <div className="text-sm text-gray-700">
        <div className="mb-1 flex justify-between">
          <span>Total de chamados:</span>
          <span>{total}</span>
        </div>
        <div className="mb-1 flex justify-between">
          <span>Em andamento:</span>
          <span>{inProgress}</span>
        </div>
        <div className="mb-1 flex justify-between">
          <span>Concluídos:</span>
          <span>{done}</span>
        </div>
        <div className="flex justify-between">
          <span>Atrasados:</span>
          <span className="text-red-500">{late}</span>
        </div>
      </div>
    </aside>
  );
}
