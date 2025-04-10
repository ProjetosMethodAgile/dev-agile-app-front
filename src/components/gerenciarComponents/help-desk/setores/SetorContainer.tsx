"use client";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useState } from "react";
import { postSetorHelpDesk } from "@/actions/HelpDesk/postSetorHelpDesk";
import { redirect, useParams, usePathname } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { ModalCadSetor } from "./ModalCadSetor";
import SetorList from "./SetorList";

export type SetorContainerProps = React.ComponentProps<"div">;

export default function SetorContainer({ ...props }: SetorContainerProps) {
  const [search, setSearch] = useState("");
  const AddSetorBtn = iconsMap["add"];
  const pathname = usePathname();

  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const { empresaTag } = useParams();
  const [state, formAction] = useActionState(postSetorHelpDesk, {
    errors: [],
    msg_success: "",
    success: false,
  });

  useEffect(() => {
    if (state?.errors.length) {
      state.errors.forEach((erro: string) => {
        toast.error(erro);
      });
    }
    if (state?.success) {
      toast.success(state.msg_success);
      closeGlobalModal();
      redirect(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const openModal = () => {
    if (typeof empresaTag === "string") {
      openGlobalModal(
        <ModalCadSetor
          state={state}
          formAction={formAction}
          empresaTag={empresaTag}
          closeModal={closeGlobalModal}
        />,
      );
    }
  };

  return (
    <div {...props}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Form.InputText
          inputId="search"
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
      <SetorList search={search} />
    </div>
  );
}
