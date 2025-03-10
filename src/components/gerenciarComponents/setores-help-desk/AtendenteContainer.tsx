"use client";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useState } from "react";
import { postSetorHelpDesk } from "@/actions/postSetorHelpDesk";
import { redirect, useParams } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-toastify";
import AtendenteList from "./AtendenteList";
import { ModalCadAtendente } from "./ModalCadAtendente";
import getUsuariosNaoAtendenteHelpDesk from "@/actions/getUsuariosNaoAtendenteHelpDesk";
import { usuariosDisponiveisHelpDesk } from "@/types/api/apiTypes";

export type AtendenteContainerProps = React.ComponentProps<"div">;

type usuariosResponse = {
  usuarios: usuariosDisponiveisHelpDesk[];
  error: string;
};

export default function AtendenteContainer({
  className,
  ...props
}: AtendenteContainerProps) {
  const [search, setSearch] = useState("");
  const AddSetorBtn = iconsMap["add"];

  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const { empresaTag } = useParams();
  const [state, formAction] = useActionState(postSetorHelpDesk, {
    errors: [],
    msg_success: "",
    success: false,
  });
  const [usersAvaliables, setUsersAvaliables] = useState<usuariosResponse>();

  useEffect(() => {
    if (state?.errors.length) {
      state.errors.forEach((erro: string) => {
        toast.error(erro);
      });
    }
    if (state?.success) {
      toast.success(state.msg_success);
      closeGlobalModal();
      redirect("/devagile/protect/gerenciar-sistema/configurar-help-desk");
    }
  }, [state]);

  useEffect(() => {
    async function GetUsersAvaliables() {
      const usuarios = await getUsuariosNaoAtendenteHelpDesk();
      if (usuarios.data) {
        setUsersAvaliables(usuarios.data);
      }
    }
    GetUsersAvaliables();
  }, []);

  const openModal = () => {
    if (typeof empresaTag === "string") {
      openGlobalModal(
        <ModalCadAtendente
          state={state}
          formAction={formAction}
          empresaTag={empresaTag}
          closeModal={closeGlobalModal}
          usersAvaliables={usersAvaliables}
        />,
      );
    }
  };

  return (
    <div className="" {...props}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
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
      <AtendenteList search={search} />
    </div>
  );
}
