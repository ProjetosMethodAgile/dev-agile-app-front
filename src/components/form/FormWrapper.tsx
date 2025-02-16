"use client";
import { useState } from "react";
import { setLogin } from "@/actions/login";
import { Form } from "@/components/form";
import { Mail, KeyRound } from "lucide-react";
import { EmpresaData } from "@/types/api/apiTypes";

type FormWrapperProps = {
  empresa: EmpresaData;
};

export default function FormWrapper({ empresa }: FormWrapperProps) {
  const [errortext, setErrortext] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const senha = event.currentTarget.senha.value;

    const data = await setLogin({
      email,
      senha,
      empresaTag: empresa.tag,
      empresaId: empresa.id,
    });
    if (data.message) {
      setErrortext(data.message);
    }
  }

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Form.Logo src={empresa.logo} alt={empresa.nome} />
      <Form.InputText icon={Mail} id="email" placeholder="email" />
      <Form.InputText
        icon={KeyRound}
        id="senha"
        placeholder="senha"
        type="password"
      />
      <Form.InputSubmit />
      <Form.Error>{errortext}</Form.Error>
    </Form.Root>
  );
}
