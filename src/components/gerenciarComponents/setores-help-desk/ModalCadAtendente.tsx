"use client";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import SectionTitle from "@/components/titles/SectionTitle";
import FormInputSelect from "@/components/form/FormInputSelect";
import { useEffect } from "react";
import getUsuariosNaoAtendenteHelpDesk from "@/actions/getUsuariosNaoAtendenteHelpDesk";
import { usuariosDisponiveisHelpDesk } from "@/types/api/apiTypes";

type stateProps = {
  success: boolean;
  errors: string[];
  msg_success: string;
};

type usuariosResponse = {
  usuarios: usuariosDisponiveisHelpDesk[];
  error: string;
};

type ModalCadAtendenteProps = {
  state: stateProps | void; // ou tipar corretamente de acordo com useActionState
  formAction: (payload: FormData) => void;
  empresaTag: string;
  closeModal: () => void;
  usersAvaliables: usuariosResponse | undefined;
};

export function ModalCadAtendente({
  formAction,
  empresaTag,
  closeModal,
  usersAvaliables,
}: ModalCadAtendenteProps) {
  const Voltar = iconsMap["voltar"];
  const Add = iconsMap["add"];
  console.log(usersAvaliables);
  const options =
    usersAvaliables?.usuarios.map((user) => ({
      id: user.usuario_id,
      nome: user.usuario.nome,
    })) || [];
  return (
    <Form.Root action={formAction} className="">
      <Voltar
        className="size-10 cursor-pointer active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />
      <SectionTitle title="Selecione um usuario" className="mb-2 block" />
      <FormInputSelect label="nome" options={options} id="1" />
      <SectionTitle title="Setores" className="mb-2 block" />

      <Form.InputText
        name="emptag"
        value={empresaTag}
        disabled
        hidden
        className="my-0 hidden"
      />
      <Form.InputSubmit className="flex items-center justify-center gap-1 bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:scale-95 active:bg-green-600">
        <Add />
        <span className="text-2xl">Cadastrar</span>
      </Form.InputSubmit>
    </Form.Root>
  );
}
