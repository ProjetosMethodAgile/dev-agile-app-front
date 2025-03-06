import { Form } from "@/components/form";
import iconsMap from "@/utils/iconsMap";
import SectionTitle from "@/components/titles/SectionTitle";

type ModalEditSetorProps = {
  closeModal: () => void;
};

export function ModalEditSetor({ closeModal }: ModalEditSetorProps) {
  const Voltar = iconsMap["voltar"];

  return (
    <Form.Root className="w-3/5">
      <Voltar
        className="size-10 cursor-pointer active:scale-95"
        aria-label="Fechar Modal"
        onClick={closeModal}
      />
    </Form.Root>
  );
}
