import { User } from "@/types/api/apiTypes";
import UsuarioCard from "./UsuarioCard";
import { filterTypes } from "./UsuariosContainer";

type UsuariosCardsProps = {
  data: User[];
  search: string;
  currentFilter: filterTypes;
};

export default function UsuariosCards({
  data,
  search = "",
  currentFilter,
}: UsuariosCardsProps) {
  const lowerSearch = search.toLowerCase();
  const isPerfilAtivo = currentFilter.perfil !== "ambos";
  const isStatusAtivo = currentFilter.status !== "ambos";

  const visibleData = data.filter((user) => {
    //se o filtro de pesquisa estiver ativo, verifica se o nome ou email do usuario contém o valor do filtro
    const matchNomeOuEmail =
      user.nome.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch);

    //se o filtro de status estiver ativo, verifica se o status do usuario é igual ao filtro
    const matchStatus = !isStatusAtivo || user.status.toLowerCase() === currentFilter.status.toLowerCase();

    //garante que o usuario tenha pelo menos um perfil
    const userPerfil = user.usuario_roles[0]?.nome?.toLowerCase() ?? "";

    //se o filtro de perfil estiver ativo, verifica se o perfil do usuario é igual ao filtro
    const matchPerfil = !isPerfilAtivo || userPerfil === currentFilter.perfil.toLowerCase();

    return matchNomeOuEmail && matchStatus && matchPerfil;
  });

  if (visibleData.length < 1) {
    return (
      <div className="mt-50 text-center">Não há usuários cadastrados</div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-3 items-stretch gap-2 *:flex-1 max-xl:grid-cols-2 max-lg:grid-cols-1">
      {visibleData.map((user: User) => (
        <UsuarioCard key={user.id} user={user} />
      ))}
    </div>
  );
}