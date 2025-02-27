"use client";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import { twMerge } from "tailwind-merge";
import { Setor } from ".";
import { useGlobalContext } from "@/context/globalContext";
import { useState } from "react";
import SectionTitle from "@/components/titles/SectionTitle";
import { postSetorHelpDesk } from "@/actions/postSetorHelpDesk";

export type SetorContainerProps = React.ComponentProps<"div">;

export default function SetorContainer({
  className,
  ...props
}: SetorContainerProps) {
  const [search, setSearch] = useState("");
  const AddSetorBtn = iconsMap["add"];

  const { openGlobalModal, closeGlobalModal } = useGlobalContext();

  const openModal = () => {
    const Voltar = iconsMap["voltar"];
    const Add = iconsMap["add"];
    openGlobalModal(
      <Form.Root action={postSetorHelpDesk} className="">
        <Voltar
          className="size-10 cursor-pointer active:scale-95"
          aria-label="Fechar Modal"
          onClick={closeGlobalModal}
        />
        <SectionTitle title="Cadastrar Setor" className="block text-center" />
        <Form.InputText
          label="Nome"
          name="nome"
          placeholder="Comercial"
          className="my-5"
        />
        <Form.InputSubmit className="flex items-center justify-center gap-1 bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:scale-95 active:bg-green-600">
          <Add />
          <span className="text-2xl">Cadastrar</span>
        </Form.InputSubmit>
      </Form.Root>,
    );
  };

  return (
    <div className={twMerge("w-full", className)} {...props}>
      <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row">
        <Form.InputText
          id="search"
          name="search"
          icon={iconsMap["search"]}
          placeholder="Busque o setor"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="flex-1"
          aria-label="Buscar setor"
        />
        <button
          onClick={openModal}
          className="flex h-11 w-20 cursor-pointer items-center justify-center rounded-xl bg-green-500 text-white hover:bg-green-600 active:scale-95"
          aria-label="Adicionar setor"
        >
          <AddSetorBtn />
        </button>
      </div>
      <Setor.Root>
        <Setor.List search={search} />
      </Setor.Root>
    </div>
  );
}
