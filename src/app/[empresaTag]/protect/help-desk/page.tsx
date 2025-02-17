// app/[empresa]/protect/home/page.tsx
import KanbanRoot from "@/components/HelpDesk/Kanban";
import ScreenValidator from "@/components/ScreenValidator/ScreenValidator";

export default function EmpresaHomePage() {
  return (
    <main className="h-screen overflow-hidden p-6">
      {/* Valida se o usuário tem acesso à tela "Help Desk" */}
      <ScreenValidator screenName="Help Desk" />
      <div className="">
        <h1>Help Desk</h1>
        <KanbanRoot />
      </div>
    </main>
  );
}
