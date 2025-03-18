"use client";

import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import getAtendentesHelpDesk from "@/actions/getAtendentesHelpDesk";
import { AtendentesHelpDesk } from "@/types/api/apiTypes";

export type AtendenteListProps = React.ComponentProps<"div"> & {
  search?: string;
};

export default function AtendenteList({
  search = "",
  ...props
}: AtendenteListProps) {
  const [atendentes, setAtendentes] = useState<AtendentesHelpDesk[]>([]);
  // const { openGlobalModal, closeGlobalModal } = useGlobalContext();

  useEffect(() => {
    async function getAtendentes() {
      const response = await getAtendentesHelpDesk();
      if (response.ok && response.data) {
        setAtendentes(response.data.atendentes);
      }
    }
    getAtendentes();
  }, []);

  useEffect(() => {
    console.log(atendentes);
  }, [atendentes]);
  const openModal = () => {
    // openGlobalModal(<ModalEditSetor closeModal={closeGlobalModal} />);
  };

  const filteredAtendentes = search
    ? atendentes.filter((s) =>
        s.UsuarioAtendente.nome.toLowerCase().includes(search.toLowerCase()),
      )
    : atendentes;

  return (
    <div {...props} className="h-80 overflow-y-auto">
      <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
        <li className="min-w-50 text-center">Nome</li>
        <li className="min-w-50 text-center">Qtde. Setores</li>
        <li className="min-w-50 text-center">Ações</li>
      </ul>
      {filteredAtendentes.length ? (
        filteredAtendentes.map((atendente) => {
          const IconEdit = iconsMap["editBtn"];
          const IconDelete = iconsMap["delete"];
          return (
            <ul
              className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
              key={atendente.UsuarioAtendente.nome}
            >
              <li className="min-w-50 text-center">
                {atendente.UsuarioAtendente.nome?.length >= 21
                  ? atendente.UsuarioAtendente.nome.slice(0, 20) + "..."
                  : atendente.UsuarioAtendente.nome}
              </li>
              <li className="min-w-50 text-center">
                {atendente.Setores.length}
              </li>
              <li className="flex min-w-50 justify-center gap-1">
                <button
                  onClick={openModal}
                  className="bg-primary-100 cursor-pointer rounded-xl p-2 text-white hover:bg-blue-600 active:scale-95"
                >
                  <IconEdit />
                </button>
                <button className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95">
                  <IconDelete />
                </button>
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
