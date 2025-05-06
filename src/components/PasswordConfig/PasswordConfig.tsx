"use client";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useActionState, useEffect } from "react";
import { updateUser } from "@/actions/updateUser";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function PasswordConfig() {
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const router = useRouter();
  const { user } = useUser();
  const [state, formAction] = useActionState(updateUser, {
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

      const currentPath = window.location.pathname;
      const newPath = currentPath.replace("/criar-senha", "/home");
      router.push(newPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    openGlobalModal(
      <Form.Root action={formAction}>
        <Form.Section
          title="Definir Senha"
          className="text-primary-50 flex flex-col"
        >
          <p>
            Voce está utilizando uma senha temporaria! Por favor defina uma nova senha para
            acessar o sistema.
          </p>
          <Form.InputText
            label="Senha"
            type="password"
            inputId="senha"
            name="senha"
          />
          <Form.InputText
            label="Confirmar Senha"
            type="password"
            inputId="confirm_password"
            name="confirm_password"
          />
          <Form.InputText
            label="Primeiro Acesso"
            type="text"
            inputId="primeiro_acesso"
            name="primeiro_acesso"
            value={user?.usuario.primeiro_acesso ? "Sim" : "Não"}
            className="hidden"
            readOnly
          />
          <Form.InputText
            label="Id"
            type="text"
            inputId="id"
            name="id"
            value={user?.usuario.id}
            className="hidden"
            readOnly
          />
          <Form.InputText
            label="Tipo Usuario"
            type="text"
            inputId="tipo_usuario"
            name="tipo_usuario"
            value={user?.usuario.usuario_roles[0].id}
            className="hidden"
            readOnly
          />
        </Form.Section>
        <Form.InputSubmit>Atualizar Senha</Form.InputSubmit>
      </Form.Root>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <div></div>;
}
