import { getStatusForUserID } from "@/actions/HelpDesk/Atendente/getUserAtendenteforID";
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import AtendenteContainer from "@/components/gerenciarComponents/help-desk/atendentes/AtendenteContainer";
import SetorContainer from "@/components/gerenciarComponents/help-desk/setores/SetorContainer";
import ScreenTitle from "@/components/titles/ScreenTitle";
import SectionTitle from "@/components/titles/SectionTitle";
import iconsMap from "@/utils/iconsMap";

export default async function GerenciarUsuariosPage() {
  await validateScreenAccess("Configurar Help Desk");
  return (
    <div className="p-5">
      <ScreenTitle
        title="Gerenciar - Help Desk"
        icon={iconsMap["configurar-help-desk"]}
      />
      <div className="mirror-container flex flex-wrap gap-20 p-5 md:p-10">
        <div className="dark:border-primary-600/70 border-primary-300 rounded-2xl border-2 p-8">
          <SectionTitle title="Setores" className="mb-5 text-center" />
          <SetorContainer />
        </div>
        <div className="dark:border-primary-600/70 border-primary-300 rounded-2xl border-2 p-8">
          <SectionTitle title="Atendentes" className="mb-5 text-center" />
          <AtendenteContainer />
        </div>
      </div>
    </div>
  );
}
