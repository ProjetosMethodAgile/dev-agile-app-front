"use client";

import { useState } from "react";
import { Form } from "@/components/form";
import { SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import KanbanColumn from "@/components/HelpDesk/KanbanColumn";

type ModalEditSetorProps = {
  closeModal: () => void;
  setor: SetorHelpDesk;
};

function Tab1Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  const Config = iconsMap["settings"];
  const IconDelete = iconsMap["delete"];
  const IconEdit = iconsMap["editBtn"];
  const AddSetorBtn = iconsMap["add"];

  return (
    <div className="animate-move-left-to-right min-h-90 min-w-130">
      <div className="mb-2 flex items-center gap-2">
        <Config />
        <h1 className="text-2xl">configurações do setor - {setorProps.nome}</h1>
      </div>
      <div>
        <div className="mb-3 flex justify-between">
          <h1 className="text-2xl">colunas do Kanban</h1>
          <div className="flex gap-2">
            <div className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95">
              <IconDelete />
            </div>
            <div className="bg-primary-100 cursor-pointer rounded-xl p-2 text-white hover:bg-blue-600 active:scale-95">
              <IconEdit />
            </div>
            <div className="cursor-pointer rounded-xl bg-green-500 p-2 text-white hover:bg-green-600 active:scale-95">
              <AddSetorBtn />
            </div>
          </div>
        </div>
        <div className="bg-primary-150 flex max-w-130 overflow-x-auto">
          <KanbanColumn title="em andamento">
            <div></div>
          </KanbanColumn>
          <KanbanColumn title="em andamento">
            <div></div>
          </KanbanColumn>
          <KanbanColumn title="em andamento">
            <div></div>
          </KanbanColumn>
        </div>
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
        <h1 className="text-2xl">atendentes do setor - {setorProps.nome}</h1>
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
    <Form.Root className="flex max-h-[80vh] flex-col overflow-hidden">
      <Voltar
        className="size-10 cursor-pointer self-end active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />
      <div className="flex gap-5">
        <ul className="mirror-container flex flex-col gap-4 self-start">
          <li
            className={`${activeTab === "tab1" && "bg-primary-300"} flex cursor-pointer gap-2 rounded-2xl p-2`}
            onClick={() => setActiveTab("tab1")}
          >
            <Config />
            config. setor
          </li>
          <li
            className={`${activeTab === "tab2" && "bg-primary-300"} flex cursor-pointer gap-2 rounded-2xl p-2`}
            onClick={() => setActiveTab("tab2")}
          >
            <Users />
            atendentes
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
