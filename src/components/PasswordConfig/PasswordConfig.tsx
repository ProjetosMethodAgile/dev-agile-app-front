"use client";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useActionState, useEffect, useState } from "react";
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
  const [passwords, setPasswords] = useState({
    senha: "",
    confirm_password: "",
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

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (passwords.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!passwords.senha) {
      toast.error("Senha é obrigatória.");
      return;
    }

    if (!passwords.confirm_password) {
      toast.error("Confirmação de senha é obrigatória.");
      return;
    }

    if (passwords.senha !== passwords.confirm_password) {
      toast.error("As senhas não coincidem.");
      return;
    }

    formAction(formData);
  };

  useEffect(() => {
    openGlobalModal(
      <Form.Root onSubmit={updatePassword}>
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
            value={passwords.senha}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                senha: (e.target as HTMLInputElement).value,
              })
            }
          />
          <Form.InputText
            label="Confirmar Senha"
            type="password"
            inputId="confirm_password"
            name="confirm_password"
            value={passwords.confirm_password}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirm_password: (e.target as HTMLInputElement).value,
              })
            }
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
  }, [user]);

  return <div></div>;
}
