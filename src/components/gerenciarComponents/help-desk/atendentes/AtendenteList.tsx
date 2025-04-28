"use client";

import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import getAtendentesHelpDesk from "@/actions/getAtendentesHelpDesk";
import { HelpDeskSetoresPorAtendenteAtivos } from "@/types/api/apiTypes";
import AtendenteEdit from "./AtendenteEdit";
import { pegaTodosAtendente } from "@/actions/HelpDesk/AcoesColuna/getAllAtendente";

export type AtendenteListProps = React.ComponentProps<"div"> & {
  search?: string;
  setModalAtendenteEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalAtendenteEdit: boolean;
};

export default function AtendenteList({
  search = "",
  setModalAtendenteEdit,
  modalAtendenteEdit,
  ...props
}: AtendenteListProps) {
  const [atendentes, setAtendentes] = useState<HelpDeskSetoresPorAtendenteAtivos[]>([]);



  useEffect(() => {
    async function fetchAtendentes() {
      const response = await pegaTodosAtendente();
      if (response.ok && response.data) {
        setAtendentes(response.data);   
        console.log(response.data);
             
      }
    }
    fetchAtendentes();
  }, []);

  const filteredAtendentes = search
    ? atendentes.filter((s) =>
        s.UsuarioAtendente.nome
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : atendentes;



  // Handler para quando o usuário clicar numa linha
  function handleSelect() {
    setModalAtendenteEdit(true);
  }

  // Se estiver no modo de edição, exibe o componente de edição
  if (modalAtendenteEdit) {
    return (
      <div className="h-80 overflow-y-auto">
        <AtendenteEdit
        atendentes={atendentes}
        setModalAtendenteEdit={setModalAtendenteEdit}
      />
      </div>
    );
  }

  // Senão, exibe a lista de atendentes
  return (
    <div {...props} className="h-80 overflow-y-auto">
      <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
        <li className="min-w-50 text-center">Nome</li>
        <li className="min-w-50 text-center">Qtde. Setores</li>
        <li className="min-w-50 text-center">{modalAtendenteEdit?"Ação":"Status"}</li>
      </ul>

      {filteredAtendentes.length > 0 ? (
        filteredAtendentes.map((atendente) => {
          const IconDelete = iconsMap["delete"];
          return (
            <ul
              key={atendente.id}
              onClick={() => handleSelect()}
              className="cursor-pointer dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
            >
              <li className="min-w-50 text-center">
                {atendente.UsuarioAtendente.nome.length >= 21
                  ? atendente.UsuarioAtendente.nome.slice(0, 20) + "…"
                  : atendente.UsuarioAtendente.nome}
              </li>
              <li className="min-w-50 text-center">
                {atendente.Setores.length}
              </li>
              <li className="flex min-w-45 justify-center gap-1">
                <div className="flex flex-col items-center">
                  <p>{atendente.status}</p>
                  <div
                    className={`${
                      !atendente.status
                      
                        ? "bg-red-500"
                        : "bg-green-600"
                    } flex items-center size-3 rounded-full`}
                  />
                </div>
              </li>
            </ul>
          );
        })
      ) : (
        <span className="block p-2 text-center text-2xl">
          Nenhum atendente encontrado
        </span>
      )}
    </div>
  );
}
