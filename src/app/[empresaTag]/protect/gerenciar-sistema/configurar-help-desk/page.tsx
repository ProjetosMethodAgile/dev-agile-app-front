import { validateScreenAccess } from "@/actions/validateScreenAccess";
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
      <div className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 container flex flex-col items-center rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl md:p-10 dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl">
        <div className="w-1/2">
          <SectionTitle title="Setores" className="mb-5 text-center" />
          <SetorContainer className="grid grid-cols-1 gap-4" />
        </div>
      </div>
    </div>
  );
}
