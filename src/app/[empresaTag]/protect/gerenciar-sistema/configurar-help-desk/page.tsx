import { validateScreenAccess } from "@/actions/validateScreenAccess";
import { Form } from "@/components/form";
import SetorContainer from "@/components/gerenciarComponents/setores-help-desk/SetorContainer";
import ScreenTitle from "@/components/titles/ScreenTitle";
import SectionTitle from "@/components/titles/SectionTitle";
import iconsMap from "@/utils/iconsMap";

export default async function GerenciarUsuariosPage() {
  await validateScreenAccess("Configurar Help Desk");

  return (
    <div className="container">
      <ScreenTitle
        title="Gerenciar - Help Desk"
        icon={iconsMap["configurar-help-desk"]}
      />
      <div className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 h-[90dvh] rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl">
        <SectionTitle title={"Setores"} className="mb-5" />
        <SetorContainer className="w-1/2" />
      </div>
    </div>
  );
}
