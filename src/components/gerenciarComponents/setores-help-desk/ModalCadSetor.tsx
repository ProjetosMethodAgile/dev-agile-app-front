import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import SectionTitle from "@/components/titles/SectionTitle";

type stateProps = {
  success: boolean;
  errors: string[];
  msg_success: string;
};

type ModalCadSetorProps = {
  state: stateProps | void; // ou tipar corretamente de acordo com useActionState
  formAction: (payload: FormData) => void;
  empresaTag: string;
  closeModal: () => void;
};

export function ModalCadSetor({
  formAction,
  empresaTag,
  closeModal,
}: ModalCadSetorProps) {
  const Voltar = iconsMap["voltar"];
  const Add = iconsMap["add"];

  return (
    <Form.Root action={formAction} className="">
      <Voltar
        className="size-10 cursor-pointer active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />
      <SectionTitle title="Cadastrar Setor" className="block text-center" />
      <Form.InputText
        label="Nome"
        name="nome"
        placeholder="Comercial"
        className="my-5"
      />
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
