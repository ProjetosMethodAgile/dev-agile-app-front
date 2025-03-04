import getUserAll from "@/actions/getUserAll";
import ScreenTitle from "@/components/titles/ScreenTitle";
import AddButton from "@/components/ui/button/RedirectButton";
import Table from "@/components/ui/table/Table";
import { User } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";

export default async function UsuariosDoSistemaPage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;
  const { data, ok, error } = await getUserAll();

  if (!ok || !data) return <div>Não há dados para retornar: {error}</div>;

  const userColumns: { key: keyof User; label: string }[] = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "contato", label: "Contato" },
  ];

  return (
    <div className="container">
      <ScreenTitle
        title="Usuarios do sistema"
        icon={iconsMap["usuarios-do-sistema"]}
      />
      <div className="mirror-container">
        <AddButton route="usuarios-do-sistema/criar" />
        <Table data={data} columns={userColumns}  />
      </div>
    </div>
  );
}
