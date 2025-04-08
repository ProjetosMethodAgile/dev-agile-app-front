import { User } from "@/types/api/apiTypes";
import UsuarioCard from "./UsuarioCard";

export default function UsuariosCards({
  data,
  search = "",
}: {
  data: User[];
  search?: string;
}) {
  const visibleData = data.filter((user) => {
    return (
      user.nome.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (visibleData.length < 1)
    return (
      <div className="mt-50 text-center">Não há usuarios cadastrados </div>
    );
  return (
    <div className="mt-6 grid grid-cols-3 items-stretch gap-2 *:flex-1 max-xl:grid-cols-2 max-lg:grid-cols-1">
      {visibleData.map((user: User) => {
        return <UsuarioCard key={user.id} user={user} />;
      })}
    </div>
  );
}
