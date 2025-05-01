"use client";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useActionState, useEffect } from "react";
import { updateUser } from "@/actions/updateUser";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";

export function PasswordConfig() {
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
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
            Este é o seu primeiro acesso! Por favor defina uma nova senha para
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
            inputId="senha"
            name="senha"
            
          />
          <Form.InputText
            label="Primeiro Acesso"
            type="text"
            inputId="primeiro_acesso"
            name="primeiro_acesso"
            value="Não"
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
  }, [user,openGlobalModal]);

  return <div></div>;
}
