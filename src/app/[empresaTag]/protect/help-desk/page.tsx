// app/[empresa]/protect/home/page.tsx
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import KanbanRoot from "@/components/HelpDesk/Kanban";

export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");

  return (
    <main className="h-dvh overflow-hidden p-6">
      <div className="">
        <h1>Help Desk</h1>
        <KanbanRoot />
      </div>
    </main>
  );
}
