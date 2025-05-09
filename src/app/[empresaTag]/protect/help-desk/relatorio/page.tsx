import { Suspense } from "react";
import { KanbanHistory } from "@/types/api/apiTypes";
import FiltersSidebar from "@/components/HelpDesk/relatorio/FiltersSidebar";
import KpiGrid from "@/components/HelpDesk/relatorio/KpiGrid";
import ChartsGrid from "@/components/HelpDesk/relatorio/ChartsGrid";
import MovementsTable from "@/components/HelpDesk/relatorio/MovementsTable";
import SlaDelayedTable from "@/components/HelpDesk/relatorio/SlaDelayedTable";
import TopInteractionsTable from "@/components/HelpDesk/relatorio/TopInteractionsTable";
import getKanbanStatusHistories from "@/actions/HelpDesk/relatorio/getKanbanStatusHistories";

export const metadata = {
  title: "Painel SLA & KPI – Central de Chamados",
};

export default async function RelatorioHelpDeskPage() {
  const result = await getKanbanStatusHistories();
  let histories: KanbanHistory[] = [];
  let errorMessage: string | null = null;

  if (result.ok) {
    histories = result.data;
  } else {
    errorMessage = result.error;
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          📊 Painel SLA & KPI – Central de Chamados
        </h1>
      </header>

      {errorMessage && (
        <div className="mb-4 rounded bg-red-600 p-3 text-white">
          Erro ao carregar dados: {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        <FiltersSidebar data={histories} />

        <main className="flex flex-1 flex-col gap-6">
          <KpiGrid data={histories} />
          <ChartsGrid data={histories} />
          <Suspense fallback={<p>Carregando tabelas...</p>}>
            <MovementsTable data={histories} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SlaDelayedTable data={histories} />
              <TopInteractionsTable data={histories} />
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
