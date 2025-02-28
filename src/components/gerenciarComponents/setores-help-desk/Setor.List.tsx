"use client";

import getSetoresHelpDesk from "@/actions/getSetoresHelpDesk";
import { SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";

export type SetorListProps = React.ComponentProps<"div"> & {
  search?: string;
};

export default function SetorList({ search = "", ...props }: SetorListProps) {
  const [setores, setSetores] = useState<SetorHelpDesk[]>([]);

  useEffect(() => {
    async function getSetores() {
      const response = await getSetoresHelpDesk();
      if (response.ok && response.data) {
        setSetores(response.data);
      }
    }
    getSetores();
  }, []);

  const filteredSetores = search
    ? setores.filter((s) => s.nome.toLowerCase().includes(search.toLowerCase()))
    : setores;

  return (
    <div {...props}>
      <ul className="dark:bg-primary-600 bg-primary-500 flex rounded-md text-white">
        <li className="w-3xl text-center">Nome</li>
        <li className="w-3xl text-center">Qtde. Func</li>
        <li className="w-3xl text-center">Ações</li>
      </ul>
      <div className="h-70 overflow-x-hidden overflow-y-auto">
        {filteredSetores.length ? (
          filteredSetores.map((setor) => {
            const IconEdit = iconsMap["editBtn"];
            const IconDelete = iconsMap["delete"];
            return (
              <ul
                className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
                key={setor.nome}
              >
                <li className="w-3xl text-center">{setor.nome}</li>
                <li className="w-3xl text-center">À configurar</li>
                <li className="flex w-3xl justify-center gap-1">
                  <button className="bg-primary-100 cursor-pointer rounded-xl p-2 text-white hover:bg-blue-600 active:scale-95">
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
            Nenhum setor encontrado
          </span>
        )}
      </div>
    </div>
  );
}
