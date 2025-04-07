import getUsersByEmpresaId from "@/actions/getUsersByEmpresaId";
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import { Form } from "@/components/form";
import ScreenTitle from "@/components/titles/ScreenTitle";
import AddButton from "@/components/ui/button/RedirectButton";
import UsuariosCards from "@/components/Usuarios/UsuariosCards";
import iconsMap from "@/utils/iconsMap";
import { Search } from "lucide-react";

export default async function UsuariosDoSistemaPage() {
  await validateScreenAccess("Usuarios do sistema");
  const { data, ok, error } = await getUsersByEmpresaId();

  if (!ok || !data) return <div>Não há dados para retornar: {error}</div>;

  return (
    <div className="container">
      <ScreenTitle
        title="Usuarios do sistema"
        icon={iconsMap["usuarios-do-sistema"]}
      />
      <div className="mirror-container h-[100vh]">
        <div className="flex items-center justify-between">
          <Form.InputText placeholder="Procure por usuario" icon={Search} />
          <AddButton route="usuarios-do-sistema/criar" />
        </div>

        <UsuariosCards data={data} />
        {/* <Table data={data} columns={userColumns} /> */}
      </div>
    </div>
  );
}
