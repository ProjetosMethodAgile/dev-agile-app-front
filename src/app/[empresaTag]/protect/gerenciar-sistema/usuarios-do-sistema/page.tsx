import getUsersByEmpresaId from "@/actions/getUsersByEmpresaId";
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import UsuariosContainer from "@/components/Usuarios/UsuariosContainer";


export default async function UsuariosDoSistemaPage() {
  await validateScreenAccess("Usuarios do sistema");
  const { data, ok, error } = await getUsersByEmpresaId();


  if (!ok || !data) return <div>Não há dados para retornar: {error}</div>;

  return <UsuariosContainer data={data} />;
}
