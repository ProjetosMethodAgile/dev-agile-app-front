"use client";

import { useState } from "react";
import { setLogin } from "@/actions/login";
import { EmpresaData } from "@/types/api/apiTypes";

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
    const data = await setLogin({ email, senha, empresaTag: empresa.tag });
    if (data?.message) {
      setError(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-5 bg-slate-600"
      // Usa a cor secundária da empresa como fundo (ou adapte conforme sua necessidade)
      // style={{ backgroundColor: empresa.cor_secundaria }}
    >
      <div className="flex justify-center">
        {/* Exibe a logo da empresa */}
        <img src={empresa.logo} alt={empresa.nome} className="w-5 h-5" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="text" className="w-full" />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input id="senha" name="senha" type="password" className="w-full" />
      </div>
      <button className="bg-teal-500 p-2 w-full" type="submit">
        Entrar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
