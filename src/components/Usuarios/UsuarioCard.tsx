import { User } from "@/types/api/apiTypes";
import { EllipsisVertical, User2 } from "lucide-react";
import { useState } from "react";

export default function UsuarioCard({ user }: { user: User }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      key={user.id}
      className="border-primary-600 bg-primary-170/60 flex flex-col justify-center gap-2 rounded-2xl border-2 border-solid p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="ml-2 flex items-center gap-4">
          <User2 className="bg-primary-300 size-10 min-w-10 rounded-full p-1" />
          <div className="flex flex-col">
            <span className="flex  items-center gap-2 justify-self-start">
              {user.nome}
              <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`block relative  size-2 cursor-pointer  rounded-full ${user.status === "Ativo" ? "bg-green-600" : "bg-red-600"}`}
              >
                {showTooltip && (
                  <div className="absolute z-10 left-2 top-1 transition-all rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md">
                    {user.status}
                  </div>
                )}
              </span>
            </span>
            <span className="max-w-50 truncate text-sm">{user.email}</span>
          </div>
        </div>
        <EllipsisVertical
          className="bg-primary-600 hover:bg-primary-600/70 flex min-w-5 cursor-pointer self-start rounded-full p-1"
          size={22}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="bg-primary-500 rounded-2xl p-2 text-sm">
          {user.usuario_roles.map((role) => (
            <div key={role.id}>{role.nome}</div>
          ))}
        </span>
        <span className="hover:border-primary-50 border-b-2 border-transparent hover:cursor-pointer">
          Gerenciar
        </span>
      </div>
    </div>
  );
}
