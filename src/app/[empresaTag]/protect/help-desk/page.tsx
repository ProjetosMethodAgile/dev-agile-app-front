// app/[empresa]/protect/home/page.tsx
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import { Kanban } from "@/components/HelpDesk";

export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");

  return (
    <main className="h-dvh overflow-hidden p-6">
      <div className="">
        <h1>Help Desk</h1>
        <Kanban.Root>
          <Kanban.Column title="teste">
            <Kanban.Card titleCard="chamado 123" />
          </Kanban.Column>
        </Kanban.Root>
      </div>
    </main>
  );
}
