"use client";

import getSetoresHelpDesk from "@/actions/getSetoresHelpDesk";
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

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentbtn = e.currentTarget.value;
    const dataSetor = setores.filter((setor) => setor.id === currentbtn);
    openGlobalModal(
      <ModalEditSetor setor={dataSetor[0]} closeModal={closeGlobalModal} />,
    );
  };

  const filteredSetores = search
    ? setores.filter((s) =>
        s.nome?.toLowerCase().includes(search.toLowerCase()),
      )
    : setores;

  return (
    <div {...props} className="h-80 overflow-x-hidden overflow-y-auto">
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
              <li className="min-w-50 text-center">
                {setor.nome?.length >= 21
                  ? setor.nome.slice(0, 20) + "..."
                  : setor.nome}
              </li>
              <li className="min-w-50 text-center">
                {setor.Atendentes.length}
              </li>
              <li className="flex flex-1 justify-center gap-2">
                <button
                  onClick={openModal}
                  value={setor.id}
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
