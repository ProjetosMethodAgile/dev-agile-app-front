
import getUserAll from "@/actions/getUserAll";
import ScreenTitle from "@/components/titles/ScreenTitle";
import iconsMap from "@/utils/iconsMap";
import { Pencil, Trash } from "lucide-react";

export default async function UsuariosDoSistemaPage() {
  const { data, ok, error } = await getUserAll();
  if (!ok || !data) return <div>Não há dados para retornar: {error}</div>;

  const {usuarios} = data
  console.log(data);
  
  return (
    <div className="container">
      <ScreenTitle
        title="Usuarios do sistema"
        icon={iconsMap["usuarios-do-sistema"]}
      />
      <div className="mirror-container">
        <table className="min-w-full rounded-lg">
          <thead className="dark:text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Tipo de Usuario</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((usuario, index) => (
              <tr
                key={usuario.id}
                className={`rounded-2xl border-t border-gray-50/20 ${
                  index % 2 === 0 ? "bg-primary-600/20" : "bg-primary-600/40"
                } hover:bg-primary-600/60 transition-colors`}
              >
                <td className="px-6 py-4">{usuario.nome}</td>
                <td className="px-6 py-4">{usuario.nome}</td>
                <td className="px-6 py-4">{usuario.contato}</td>
                <td className="flex justify-center space-x-4 px-6 py-4 *:p-1">
                  <button className="text-primary-50 hover:text-primary-200 cursor-pointer">
                    <Pencil size={19} />
                  </button>
                  <button className="cursor-pointer text-red-500 hover:text-red-700">
                    <Trash size={19} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
