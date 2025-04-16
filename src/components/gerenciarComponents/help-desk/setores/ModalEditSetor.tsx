"use client";

import { useState } from "react";
import { Form } from "@/components/form";
import {  SetorHelpDesk } from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";

import {

  ReceiptText,
} from "lucide-react";

import Tab3Content from "./TabContent/Tab3Content";
import Tab2Content from "./TabContent/Tab2Content";
import Tab1Content from "./TabContent/Tab1Content";

type ModalEditSetorProps = {
  closeModal: () => void;
  setor: SetorHelpDesk;
};

export function ModalEditSetor({ closeModal, setor }: ModalEditSetorProps) {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const Config = iconsMap["settings"];
  const Users = iconsMap["users"];
  const Voltar = iconsMap["CircleX"];

  return (
    <Form.Root
      onSubmit={(e) => e.preventDefault()}
      className="flex max-h-[95vh] flex-col overflow-hidden overflow-y-auto"
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
          <li
            className={`${activeTab === "tab3" ? "bg-primary-300" : ""} flex cursor-pointer gap-2 rounded-2xl p-2`}
            onClick={() => setActiveTab("tab3")}
          >
            <ReceiptText />
            Motivo
          </li>
        </ul>
        <div className="flex-1">
          {activeTab === "tab1" && <Tab1Content setorProps={setor} />}
          {activeTab === "tab2" && <Tab2Content setorProps={setor} />}
          {activeTab === "tab3" && <Tab3Content setorProps={setor} />}
        </div>
      </div>
    </Form.Root>
  );
}
