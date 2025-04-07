import { User } from "@/types/api/apiTypes";
import { EllipsisVertical, User2 } from "lucide-react";

export default function UsuarioCard({ user }: { user: User }) {
  return (
    <div
      key={user.id}
      className="border-primary-600 bg-primary-170/60 flex max-h-min max-w-86 flex-col justify-center gap-2 rounded-2xl border-2 border-solid p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="ml-2 flex gap-4 items-center ">
          <User2 className="bg-primary-300 size-10 min-w-10 rounded-full p-1" />
          <div className=" flex flex-col">
            <span className="justify-self-start">{user.nome}</span>
            <span className="max-w-50 truncate text-sm">{user.email}</span>
          </div>
        </div>
        <EllipsisVertical
          className="bg-primary-600 min-w-5 hover:bg-primary-600/70 flex cursor-pointer self-start rounded-full p-1"
          size={22}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="bg-primary-500 rounded-2xl p-2 text-sm">
          {user.usuario_roles.map((role) => (
            <div>{role.nome}</div>
          ))}
        </span>
        <span className="hover:border-primary-50 border-b-2 border-transparent hover:cursor-pointer">
          Gerenciar
        </span>
      </div>
    </div>
  );
}
