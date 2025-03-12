import { validateScreenAccess } from "@/actions/validateScreenAccess";
import AtendenteContainer from "@/components/gerenciarComponents/setores-help-desk/AtendenteContainer";
import SetorContainer from "@/components/gerenciarComponents/setores-help-desk/SetorContainer";
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
      <div className="mirror-container flex flex-col p-5 backdrop-blur-2xl md:p-10">
        <div className="">
          <SectionTitle title="Setores" className="mb-5 text-center" />
          <SetorContainer />
        </div>
        <div>
          <SectionTitle title="Atendentes" className="mb-5 text-center" />
          <AtendenteContainer />
        </div>
      </div>
    </div>
  );
}
