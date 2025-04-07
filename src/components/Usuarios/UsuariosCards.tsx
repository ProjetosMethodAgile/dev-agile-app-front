import { User } from "@/types/api/apiTypes";
import UsuarioCard from "./UsuarioCard";

export default function UsuariosCards({ data }: { data: User[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-stretch gap-4 *:flex-1">
      {data.map((user: User) => {
        return <UsuarioCard key={user.id} user={user} />;
      })}
    </div>
  );
}
