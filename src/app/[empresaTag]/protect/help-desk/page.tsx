import { validateScreenAccess } from "@/actions/validateScreenAccess";
import getSetoresHelpDeskForUser from "@/actions/HelpDesk/getSetoresHelpDeskForUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import iconsMap from "@/utils/iconsMap";
import InputSelectHelpDesk from "@/components/HelpDesk/extraComponentsHelpDesk/InputSelectHelpDesk";
import ContainerClientHelpDesk from "@/components/HelpDesk/extraComponentsHelpDesk/ContainerHelpDesk";

export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");

  const { data } = await getSetoresHelpDeskForUser();

  if (!data) return <h1>Nenhum setor cadastrado para você no momento</h1>;

  return (
    <main className="h-dvh overflow-x-hidden p-6">
      <nav className="h1-[10dvh] flex gap-5">
        <ScreenTitle
          title="Help Desk"
          icon={iconsMap["help-desk"]}
          className="mb-0 text-2xl"
        />
        <div className="w-50">
          <InputSelectHelpDesk
            options={
              data?.Setores?.map((setor) => ({
                id: setor.id,
                nome: setor.nome,
              })) || []
            }
            defaultOption={false}
          />
        </div>
      </nav>
      <ContainerClientHelpDesk />
    </main>
  );
}
