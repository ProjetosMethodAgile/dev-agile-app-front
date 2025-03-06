"use client";

import getSetoresHelpDesk from "@/actions/getSetoresHelpDesk";
import { Form } from "@/components/form";
import { useGlobalContext } from "@/context/globalContext";
import { SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useState } from "react";
import { ModalEditSetor } from "./ModalEditSetor";

export type SetorListProps = React.ComponentProps<"div"> & {
  search?: string;
};

export default function SetorList({ search = "", ...props }: SetorListProps) {
  const [setores, setSetores] = useState<SetorHelpDesk[]>([]);
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();

  useEffect(() => {
    async function getSetores() {
      const response = await getSetoresHelpDesk();
      if (response.ok && response.data) {
        setSetores(response.data);
      }
    }
    getSetores();
  }, []);

  const openModal = () => {
    openGlobalModal(<ModalEditSetor closeModal={closeGlobalModal} />);
  };

  const filteredSetores = search
    ? setores.filter((s) => s.nome.toLowerCase().includes(search.toLowerCase()))
    : setores;

  return (
    <div {...props} className="min-h-80 min-w-[600px]">
      <ul className="dark:bg-primary-600 bg-primary-500 sticky top-0 flex rounded-md text-white">
        <li className="min-w-50 text-center">Nome</li>
        <li className="min-w-50 text-center">Qtde. Func</li>
        <li className="min-w-50 text-center">Ações</li>
      </ul>
      {filteredSetores.length ? (
        filteredSetores.map((setor) => {
          const IconEdit = iconsMap["editBtn"];
          const IconDelete = iconsMap["delete"];
          return (
            <ul
              className="dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center rounded-md border p-2 transition-all"
              key={setor.nome}
            >
              <li className="min-w-50 text-center">{setor.nome}</li>
              <li className="min-w-50 text-center">À configurar</li>
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
          Nenhum setor encontrado
        </span>
      )}
    </div>
  );
}
