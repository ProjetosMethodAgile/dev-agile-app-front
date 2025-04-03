"use client";
import { useState, startTransition } from "react";
import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import SectionTitle from "@/components/titles/SectionTitle";
import FormInputSelect from "@/components/form/FormInputSelect";
import {
  SetorHelpDesk,
  usuariosDisponiveisHelpDesk,
} from "@/types/api/apiTypes";

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
  state: stateProps | void;
  formAction: (payload: FormData) => void;
  empresaTag: string;
  closeModal: () => void;
  usersAvaliables: usuariosResponse | undefined;
  setoresAvaliables: SetorHelpDesk[] | undefined;
};

export function ModalCadAtendente({
  formAction,
  empresaTag,
  closeModal,
  usersAvaliables,
  setoresAvaliables,
}: ModalCadAtendenteProps) {
  const Voltar = iconsMap["voltar"];
  const Add = iconsMap["add"];
  const IconDelete = iconsMap["delete"];

  // Estados para setores disponíveis e selecionados
  const [availableSetores, setAvailableSetores] = useState(
    setoresAvaliables?.map((setor) => ({
      id: setor.id,
      nome: setor.nome,
    })) || [],
  );
  const [selectedSetores, setSelectedSetores] = useState<
    { id: string; nome: string }[]
  >([]);

  function handleAddSetorList(selectedId: string) {
    const setorSelecionado = availableSetores.find(
      (setor) => setor.id === selectedId,
    );
    if (!setorSelecionado) return;
    setAvailableSetores((prev) =>
      prev.filter((setor) => setor.id !== selectedId),
    );
    setSelectedSetores((prev) => [...prev, setorSelecionado]);
  }

  function handleRemoveSetorList(selectedId: string) {
    const setorRemoved = selectedSetores.find(
      (setor) => setor.id === selectedId,
    );
    if (!setorRemoved) return;
    setSelectedSetores((prev) =>
      prev.filter((setor) => setor.id !== selectedId),
    );
    // Se desejar readicionar o setor removido à lista disponível, descomente a linha abaixo:
    setAvailableSetores((prev) => [...prev, setorRemoved]);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Envolva a chamada da action em startTransition para garantir o contexto correto
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form.Root action={formAction} onSubmit={handleSubmit} className="">
      <Voltar
        className="size-10 cursor-pointer active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />

      <SectionTitle title="Selecione um usuário" className="mb-2 block" />
      <FormInputSelect
        options={
          usersAvaliables?.usuarios.map((user) => ({
            id: user.usuario_id,
            nome: user.usuario.nome,
          })) || []
        }
        defaultOptionText={"Escolha um usuário"}
        name="nome"
      />

      <SectionTitle title="Setores" className="mb-2 block" />
      <FormInputSelect
        options={availableSetores}
        onChange={handleAddSetorList}
        defaultOptionText={"Escolha os setores"}
        resetAfterSelect={true}
      />

      {selectedSetores.length ? (
        <SectionTitle title="Selecionados" className="mb-2 block" />
      ) : null}
      <div className="max-h-40 overflow-x-hidden overflow-y-auto">
        {selectedSetores.map((setor) => (
          <div
            key={setor.id}
            className="animate-move-left-to-right dark:border-primary-600/70 border-primary-300 hover:bg-primary-200/50 my-1 flex h-16 items-center justify-between rounded-md border px-4 py-2 transition-all"
          >
            <span>{setor.nome}</span>
            <div
              className="cursor-pointer rounded-xl bg-red-500 p-2 text-white hover:bg-red-700 active:scale-95"
              onClick={() => handleRemoveSetorList(setor.id)}
            >
              <IconDelete />
            </div>
          </div>
        ))}
      </div>
      {/* Inputs hidden para enviar os setores selecionados */}
      {selectedSetores.map((setor) => (
        <input key={setor.id} type="hidden" name="setor_id" value={setor.id} />
      ))}

      <Form.InputText
        name="emptag"
        value={empresaTag}
        disabled
        hidden
        className="my-0 hidden"
      />

      <Form.InputSubmit className="mt-4 flex items-center justify-center gap-1 bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:scale-95 active:bg-green-600">
        <Add />
        <span className="text-2xl">Cadastrar</span>
      </Form.InputSubmit>
    </Form.Root>
  );
}
