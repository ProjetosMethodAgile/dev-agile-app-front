"use client";

import { useState } from "react";
import { Form } from "@/components/form";
import { SetorHelpDesk } from "@/types/api/apiTypes";

type ModalEditSetorProps = {
  closeModal: () => void;
  setor: SetorHelpDesk;
};

function Tab1Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  return (
    <div>
      <h1>Conteúdo da Aba 1</h1>
      <div>Nome do setor: {setorProps.nome}</div>
    </div>
  );
}

function Tab2Content({ setorProps }: { setorProps: SetorHelpDesk }) {
  return (
    <div>
      <h1>Conteúdo da Aba 2</h1>
      {setorProps && (
        <>
          <div>Nome do setor: {setorProps.nome}</div>
          <ul>
            {setorProps.Atendentes.map((atendente) => (
              <li key={atendente.id}>{atendente.UsuarioAtendente.nome}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function ModalEditSetor({ closeModal, setor }: ModalEditSetorProps) {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

  return (
    <Form.Root className="">
      <button onClick={closeModal}>Fechar Modal</button>
      <div className="flex gap-5">
        <ul className="flex flex-col gap-4">
          <li className="cursor-pointer" onClick={() => setActiveTab("tab1")}>
            1
          </li>
          <li className="cursor-pointer" onClick={() => setActiveTab("tab2")}>
            2
          </li>
        </ul>

        <div>
          {activeTab === "tab1" && <Tab1Content setorProps={setor} />}
          {activeTab === "tab2" && <Tab2Content setorProps={setor} />}
        </div>
      </div>
    </Form.Root>
  );
}
