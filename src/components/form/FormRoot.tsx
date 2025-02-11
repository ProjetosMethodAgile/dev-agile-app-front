"use client";

import { setLogin } from "@/actions/login";
import { ReactNode, useState } from "react";

export default function FormComponent({ children }: { children: ReactNode }) {
  const [error, setError] = useState({} as { message: string });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const senha = event.currentTarget.senha.value;
    const data = await setLogin({ email, senha });
    if (data?.message) {
      setError({ message: data.message });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap w-56 bg-slate-600 p-5 gap-2"
    >
      {children}
    </form>
  );
}
