import { validateScreenAccess } from "@/actions/validateScreenAccess";
import getSetoresHelpDeskForUser from "@/actions/HelpDesk/getSetoresHelpDeskForUser";
import ScreenTitle from "@/components/titles/ScreenTitle";
import iconsMap from "@/utils/iconsMap";
import InputSelectHelpDesk from "@/components/HelpDesk/extraComponentsHelpDesk/InputSelectHelpDesk";
import ContainerClientHelpDesk from "@/components/HelpDesk/extraComponentsHelpDesk/ContainerHelpDesk";

import { getStatusForUserID } from "@/actions/HelpDesk/Atendente/getUserAtendenteforID";


import Link from "next/link";


export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");
  const { data } = await getSetoresHelpDeskForUser();
  const dataStatus = await getStatusForUserID() 
  if (!dataStatus){
   return <p>Entre em contato com administrador</p>
  }


  if (!data) return <h1>Nenhum setor cadastrado para você no momento</h1>;
  const IconRelatorio = iconsMap["Dash"];

  return (
    <main className="h-dvh overflow-x-hidden p-6">
      <nav className="h1-[10dvh] flex gap-5">
        <ScreenTitle
          title="Help Desk"
          icon={iconsMap["help-desk"]}
          className="mb-0 text-2xl"
        />
        <div className="w-50 self-center">
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
        <Link
          href="help-desk/relatorio"
          className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 dark:bg-black/20; flex flex-wrap items-center gap-1 rounded-3xl border-2 bg-transparent px-5 py-3 backdrop-blur-2xl active:scale-95 max-lg:mt-0 max-sm:min-w-full"
        >
          <IconRelatorio className="size-8" />
          <p>Relatorios</p>
        </Link>
      </nav>
      <ContainerClientHelpDesk />
    </main>
  );
}
