import { useGlobalContext } from "@/context/globalContext";
import { User } from "@/types/api/apiTypes";
import { Lock, Puzzle, X } from "lucide-react";
import SectionTitle from "../titles/SectionTitle";
import { Form } from "../form";
import { putResetPassword } from "@/actions/putResetPassword";
import { useActionState, useEffect } from "react";

import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ActionsMenuUserCard({ user }: { user: User }) {
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const { empresaTag } = useParams<{ empresaTag: string }>();
  const router = useRouter();
  const [state, formAction] = useActionState(putResetPassword, {
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
      router.push(
        `/${empresaTag}/protect/gerenciar-sistema/usuarios-do-sistema`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const showRedefinePasswordModal = () => {
    openGlobalModal(
      <Form.Root
        action={formAction}
        className="mirror-container flex flex-col gap-2 p-4"
      >
        <div className="flex items-center justify-between">
          <SectionTitle title="Redefinir Senha" className="mb-1" />
          <X onClick={closeGlobalModal} className="cursor-pointer" />
        </div>
        <p className="flex flex-col items-center gap-2">
          Ao redefinir a senha deste usuario, uma nova senha será enviada para o
          email:{" "}
          <Form.InputText
            inputId="email"
            name="email"
            readOnly
            value={user.email}
          />
        </p>
        <Form.InputText
          readOnly
          hidden
          inputId="id"
          name="id"
          className="hidden"
          value={user.id}
        />
        <Form.InputText
          readOnly
          inputId="empresa_id"
          name="empresa_id"
          value={user.empresa?.[0]?.id ?? ""}
          className="hidden"
          hidden
        />

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-50">Deseja mesmo criar uma nova senha?</p>
          <Form.ButtonNext type="submit" direction="Salvar">
            {" "}
            Enviar Nova Senha{" "}
          </Form.ButtonNext>
        </div>
      </Form.Root>,
    );
  };

  return (
    <ul className="*:font-sm *:hover:bg-primary-150 border-primary-600 bg-primary-600/90 absolute top-0 right-0 flex w-50 flex-col gap-2 rounded-2xl p-2 pr-6 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-2xl *:p-1 *:text-xs">
      <li onClick={showRedefinePasswordModal}>
        <Lock className="bg-primary-500 rounded-full p-1" /> Redefinir Senha
      </li>
      <li>
        <Puzzle className="bg-primary-500 rounded-full p-1" /> Outra Opção
      </li>
    </ul>
  );
}
