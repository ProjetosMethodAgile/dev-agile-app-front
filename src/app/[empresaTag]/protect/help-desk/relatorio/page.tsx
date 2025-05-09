// src/app/[empresaTag]/protect/help-desk/relatorio/page.tsx
import React from "react";
import FiltersSidebar from "@/components/HelpDesk/relatorio/FiltersSidebar";
import KpiGrid from "@/components/HelpDesk/relatorio/KpiGrid";
import ChartsGrid from "@/components/HelpDesk/relatorio/ChartsGrid";
import MovementsSection from "@/components/HelpDesk/relatorio/MovementsSection";

import getDashboardSummary from "@/actions/HelpDesk/relatorio/getDashboardSummary";
import getDashboardCharts from "@/actions/HelpDesk/relatorio/getDashboardCharts";
import getDashboardMovements from "@/actions/HelpDesk/relatorio/getDashboardMovements";

import { Summary, ChartsData } from "@/types/api/apiTypes";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    de?: string;
    ate?: string;
    setores?: string | string[];
  }>;
}) {
  const { de = "", ate = "", setores } = await searchParams;

  const baseQuery = new URLSearchParams();
  if (de) baseQuery.set("de", de);
  if (ate) baseQuery.set("ate", ate);
  if (setores) {
    const arr = Array.isArray(setores) ? setores : [setores];
    arr.forEach((s) => baseQuery.append("setores", s));
  }

  const sumR = await getDashboardSummary(baseQuery);
  const chR = await getDashboardCharts(baseQuery);
  const mvR = await getDashboardMovements(baseQuery);

  const summary: Summary = sumR.ok
    ? sumR.data
    : {
        total: 0,
        open: 0,
        inProgress: 0,
        done: 0,
        late: 0,
        avgResolutionTime: 0,
        slaRate: 0,
        avgInteractions: 0,
      };

  const charts: ChartsData = chR.ok
    ? chR.data
    : {
        resolutionOverTime: [],
        volumeByAttendant: [],
        statusDistribution: [],
        calendarHeatmap: [],
      };

  // só passa array puro pro sidebar
  const movementsArray = mvR.ok ? mvR.data.movements : [];

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-3xl font-bold">📊 Painel SLA & KPI</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar data={movementsArray} />

        <main className="flex flex-1 flex-col gap-6">
          <KpiGrid summary={summary} />
          <ChartsGrid data={charts} />
          <MovementsSection baseQuery={baseQuery} />
        </main>
      </div>
    </div>
  );
}
