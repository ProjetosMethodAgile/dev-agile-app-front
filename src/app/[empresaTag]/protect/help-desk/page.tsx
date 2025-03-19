// app/[empresa]/protect/home/page.tsx
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import { Kanban } from "@/components/HelpDesk";
import getSetoresHelpDeskForUser from "@/actions/HelpDesk/getSetoresHelpDeskForUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import iconsMap from "@/utils/iconsMap";
import FormInputSelect from "@/components/form/FormInputSelect";
export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");

  const { data } = await getSetoresHelpDeskForUser();

  if (!data) return <h1>Nenhum setor cadastrado para você no momento</h1>;
  return (
    <main className="h-dvh overflow-x-hidden p-6">
      <nav className="h1-[10dvh]">
        <ScreenTitle
          title="Gerenciar - Help Desk"
          icon={iconsMap["help-desk"]}
          className="mb-0 text-2xl"
        />
        <FormInputSelect
          options={
            data?.Setores.map((setor) => ({
              id: setor.id,
              nome: setor.nome,
            })) || []
          }
          defaultOption={false}
        />
      </nav>
      <Kanban.Root>
        <Kanban.Column title="teste">
          <Kanban.Card titleCard="chamado 123" />
        </Kanban.Column>
      </Kanban.Root>
    </main>
  );
}
