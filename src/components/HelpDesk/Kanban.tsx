import KanbanCard from "./KanbanCard";
import KanbanColumn from "./KanbanColumn";

export default function KanbanRoot() {
  return (
    <div className="flex h-[90dvh] gap-4 overflow-x-auto p-6">
      <KanbanColumn title="Pendente">
        <KanbanCard titleCard="Chamado nº 001 Chamado nº 001Chamado nº 001Chamado nº 001Chamado nº 001" />
        <KanbanCard titleCard="Chamado nº 001" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
      <KanbanColumn title="Fazendo">
        <KanbanCard titleCard="Chamado nº 002" />
      </KanbanColumn>
    </div>
  );
}
