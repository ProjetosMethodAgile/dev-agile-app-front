"use client"
import { SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";

function Tab2Content({ setorProps }: { setorProps: SetorHelpDesk }) {
    const IconDelete = iconsMap["delete"];
    const Users = iconsMap["users"];
    return (
      <div className="animate-move-left-to-right min-h-90 min-w-130">
        <div className="mb-2 flex items-center gap-2">
          <Users />
          <h1 className="text-2xl">Atendentes do setor - {setorProps.nome}</h1>
        </div>
        
        {setorProps && (
          <div className="h-80 overflow-y-auto">
            <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
              <li className="min-w-50 text-center">Nome</li>
              <li className="min-w-50 text-center">Ações</li>
            </ul>
            <ul>
              {setorProps.Atendentes.map((atendente) => (
                <div
                  key={atendente.id}
                  className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
                >
                  <li className="min-w-50 text-center">
                    {atendente.UsuarioAtendente.nome}
                  </li>
                  <li className="flex min-w-50 justify-center text-center">
                    <div className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95">
                      <IconDelete />
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  export default Tab2Content