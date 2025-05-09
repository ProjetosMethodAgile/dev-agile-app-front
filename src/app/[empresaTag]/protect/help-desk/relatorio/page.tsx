// src/app/dashboard/page.tsx
import getDashboardCharts from "@/actions/HelpDesk/relatorio/getDashboardCharts";
import getDashboardMovements from "@/actions/HelpDesk/relatorio/getDashboardMovements";
import getDashboardSummary from "@/actions/HelpDesk/relatorio/getDashboardSummary";
import ChartsGrid from "@/components/HelpDesk/relatorio/ChartsGrid";
import FiltersSidebar from "@/components/HelpDesk/relatorio/FiltersSidebar";
import KpiGrid from "@/components/HelpDesk/relatorio/KpiGrid";
import MovementsTable from "@/components/HelpDesk/relatorio/MovementsTable";
import SlaDelayedTable from "@/components/HelpDesk/relatorio/SlaDelayedTable";
import TopInteractionsTable from "@/components/HelpDesk/relatorio/TopInteractionsTable";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { setores?: string[]; de?: string; ate?: string };
}) {
  const query = new URLSearchParams();
  (searchParams.setores || []).forEach((s) => query.append("setores[]", s));
  if (searchParams.de) query.set("de", searchParams.de);
  if (searchParams.ate) query.set("ate", searchParams.ate);

  const summaryRes = await getDashboardSummary(query);
  const chartsRes = await getDashboardCharts(query);
  const movesRes = await getDashboardMovements(query);

  if (!summaryRes.ok || !chartsRes.ok || !movesRes.ok) {
    const error = summaryRes.error || chartsRes.error || movesRes.error;
    return <div className="p-6 text-red-600">Erro: {error}</div>;
  }

  const summary = summaryRes.data;
  const charts = chartsRes.data;
  const movements = movesRes.data;

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-3xl font-bold">📊 Painel SLA & KPI</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar data={movements} summary={summary} />

        <main className="flex flex-1 flex-col gap-6">
          <KpiGrid summary={summary} />
          <ChartsGrid data={charts} />
          <Suspense fallback={<p>Carregando tabelas…</p>}>
            <MovementsTable data={movements} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SlaDelayedTable data={summary.lateList} />
              <TopInteractionsTable data={summary.topInteractions} />
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
