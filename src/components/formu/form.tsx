"use client";

import { useState } from "react";
import { setLogin } from "@/actions/login";
import { EmpresaData } from "@/types/api/apiTypes";
import { KeyRound, Mail } from "lucide-react";
// Define os props que o FormComponent vai receber
interface FormComponentProps {
  empresa: EmpresaData;
}

export default function FormComponent({ empresa }: FormComponentProps) {
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const senha = event.currentTarget.senha.value;

    // Opcional: enviar o tag da empresa para o login, para redirecionar corretamente
    const data = await setLogin({
      email,
      senha,
      empresaTag: empresa.tag,
      empresaId: empresa.id,
    });
    if (data?.message) {
      setError(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-5 bg-black/20  rounded-3xl border-1 border-primary-600 backdrop-blur-2xl min-h-100 min-w-90"
    >
      <button
        className="bg-primary-300 rounded-[10px] h-10 w-full font-bold "
        type="submit"
      >
        Entrar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
