import getUsersByEmpresaId from "@/actions/getUsersByEmpresaId";
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import { Form } from "@/components/form";
import ScreenTitle from "@/components/titles/ScreenTitle";
import AddButton from "@/components/ui/button/RedirectButton";
import UsuariosCards from "@/components/Usuarios/UsuariosCards";
import UsuariosContainer from "@/components/Usuarios/UsuariosContainer";
import iconsMap from "@/utils/iconsMap";
import { Search } from "lucide-react";

export default async function UsuariosDoSistemaPage() {
  await validateScreenAccess("Usuarios do sistema");
  const { data, ok, error } = await getUsersByEmpresaId();

  if (!ok || !data) return <div>Não há dados para retornar: {error}</div>;

  return <UsuariosContainer data={data} />;
}
