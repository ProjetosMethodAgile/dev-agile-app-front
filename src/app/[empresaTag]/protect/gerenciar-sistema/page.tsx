import getEmpresaByTag from "@/actions/getEmpresaByTag";
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import ScreenTitle from "@/components/titles/ScreenTitle";
import { Settings } from "lucide-react";
import { redirect } from "next/navigation";
import GerenciarContainer from "@/components/gerenciarComponents/GerenciarContainer";
import iconsMap from "@/utils/iconsMap";

export default async function EmpresaHomePage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Valida o acesso à tela "Gerenciar Sistema"
  await validateScreenAccess("Gerenciar Sistema");

  // Busca os dados da empresa pela tag
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/");
  }

  return (
    <main className="container p-6">
      <ScreenTitle
        title="Configurações do sistema"
        icon={iconsMap["gerenciar-sistema"]}
      />
      <div className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 h-[90dvh] rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl">
        <GerenciarContainer empresaName={empresa.data.nome} />
      </div>
    </main>
  );
}
