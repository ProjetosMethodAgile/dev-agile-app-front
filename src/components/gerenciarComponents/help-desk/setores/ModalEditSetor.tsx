"use client";

import { useEffect, useState } from "react";
import { Form } from "@/components/form";
import { KanbanColumn, SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import KanbanColumnGerenciar from "../kanban-gerenciar-sistema/KanbanColumnGerenciar";
import KanbanCardGerenciar from "../kanban-gerenciar-sistema/kanbanCardGerenciar";
import getKanbanColunaBySetorId from "@/actions/getKanbanColunaBySetorId";
import putOrdemColsHelpDesk from "@/actions/putOrdemColsHelpDesk";
import { toast } from "react-toastify";

type ModalEditSetorProps = {
  closeModal: () => void;
  setor: SetorHelpDesk;
};

function Tab1Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  const Config = iconsMap["settings"];
  const IconDelete = iconsMap["delete"];
  const IconEdit = iconsMap["editBtn"];
  const AddSetorBtn = iconsMap["add"];

  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    setDraggedIndex(index);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const updatedColumns = [...columns];
    const draggedItem = updatedColumns[draggedIndex];
    updatedColumns.splice(draggedIndex, 1);
    updatedColumns.splice(dropIndex, 0, draggedItem);
    setColumns(updatedColumns);
    setDraggedIndex(null);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  async function editaOrdemCols(setorId: string, setorList: KanbanColumn[]) {
    try {
      const listaFormatada = setorList.map((coluna, index) => ({
        id: coluna.id,
        posicao: index,
      }));

      const resposta = await putOrdemColsHelpDesk(setorId, listaFormatada);
      console.log("Resposta da atualização:", resposta);

      if (!resposta.ok) {
        toast.error(
          "Erro ao atualizar a lista, contate o administrador do sistema.",
        );
      } else {
        const mensagem =
          typeof resposta.data === "string"
            ? resposta.data
            : "Ordem  das colunas atualizada com sucesso!";
        toast.success(mensagem);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  useEffect(() => {
    async function getColumnsSetor() {
      const response = await getKanbanColunaBySetorId(setorProps.id);
      const sortedColumns = response.columns.sort(
        (a: KanbanColumn, b: KanbanColumn) =>
          parseInt(a.posicao) - parseInt(b.posicao),
      );
      setColumns(sortedColumns);
    }
    getColumnsSetor();
  }, [setorProps.id]);

  return (
    <div className="animate-move-left-to-right min-h-90 min-w-130">
      <div className="mb-2 flex items-center gap-2">
        <Config />
        <h1 className="text-2xl">Configurações do setor - {setorProps.nome}</h1>
      </div>
      <div>
        <div className="mb-3 flex justify-between">
          <h1 className="text-2xl">Colunas do Kanban</h1>
          <div className="flex gap-2">
            <div className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95">
              <IconDelete />
            </div>
            <div
              onClick={() => {
                if (!isEditing) setIsEditing(true);
              }}
              className={`cursor-pointer rounded-xl p-2 text-white hover:bg-blue-600 active:scale-95 ${
                isEditing ? "bg-blue-600" : "bg-primary-100"
              }`}
            >
              <IconEdit />
            </div>
            <div className="cursor-pointer rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95">
              <AddSetorBtn />
            </div>
          </div>
        </div>
        <div className="bg-primary-150 flex max-w-130 overflow-x-auto rounded-[10px] p-5">
          <div className="flex gap-1">
            {columns.length ? (
              columns.map((col, index) => (
                <div
                  key={col.id}
                  draggable={isEditing}
                  onDragStart={
                    isEditing ? (e) => handleDragStart(e, index) : undefined
                  }
                  onDragOver={
                    isEditing ? (e) => handleDragOver(e, index) : undefined
                  }
                  onDrop={isEditing ? (e) => handleDrop(e, index) : undefined}
                  onDragEnd={isEditing ? handleDragEnd : undefined}
                >
                  <KanbanColumnGerenciar title={col.nome}>
                    <KanbanCardGerenciar titleCard="card" />
                    <KanbanCardGerenciar titleCard="card" />
                  </KanbanColumnGerenciar>
                </div>
              ))
            ) : (
              <div className="flex-1">
                <h1 className="text-center text-2xl">
                  Sem colunas cadastradas no setor {setorProps.nome}
                </h1>
              </div>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => editaOrdemCols(setorProps.id, columns)}
              className="cursor-pointer rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95"
            >
              Confirmar Edição
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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

export function ModalEditSetor({ closeModal, setor }: ModalEditSetorProps) {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  const Config = iconsMap["settings"];
  const Users = iconsMap["users"];
  const Voltar = iconsMap["CircleX"];

  return (
    <Form.Root
      onSubmit={(e) => e.preventDefault()}
      className="flex max-h-[80vh] flex-col overflow-hidden"
    >
      <Voltar
        className="size-10 cursor-pointer self-end active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />
      <div className="flex gap-5">
        <ul className="mirror-container flex flex-col gap-4 self-start">
          <li
            className={`${activeTab === "tab1" ? "bg-primary-300" : ""} flex cursor-pointer gap-2 rounded-2xl p-2`}
            onClick={() => setActiveTab("tab1")}
          >
            <Config />
            Config. Setor
          </li>
          <li
            className={`${activeTab === "tab2" ? "bg-primary-300" : ""} flex cursor-pointer gap-2 rounded-2xl p-2`}
            onClick={() => setActiveTab("tab2")}
          >
            <Users />
            Atendentes
          </li>
        </ul>
        <div className="flex-1">
          {activeTab === "tab1" && <Tab1Content setorProps={setor} />}
          {activeTab === "tab2" && <Tab2Content setorProps={setor} />}
        </div>
      </div>
    </Form.Root>
  );
}
