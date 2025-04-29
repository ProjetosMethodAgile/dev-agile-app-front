"use client";

import { useGlobalContext } from "@/context/globalContext";
import { Form } from "../form";
import { useEffect } from "react";

export function PasswordConfig() {
  const { openGlobalModal } = useGlobalContext();

  useEffect(() => {
    openGlobalModal(
      <Form.Root>
        <Form.Section
          title="Definir Senha"
          className="text-primary-200 flex flex-col"
        >
          <p>
            Este é o seu primeiro acesso! Por favor defina uma nova senha para
            acessar o sistema
          </p>
          <Form.InputText label="Senha" />
          <Form.InputText label="Confirmar Senha" />
        </Form.Section>
        <Form.InputSubmit title="Salvar"/>
      </Form.Root>,
    );
  }, []);

  return <div></div>;
}
