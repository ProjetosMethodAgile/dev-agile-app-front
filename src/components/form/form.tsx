"use client";

import { useState } from "react";

export default function FormComponent() {
  const [error, setError] = useState({} as { message: string });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const senha = event.currentTarget.senha.value;
    const response = await fetch("/route/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });
    if (!response.ok) {
      const message = (await response.json()) as { message: string };
      setError(message);
    } else {
      window.location.href = "/home";
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap w-56 bg-slate-600 p-5 gap-2"
    >
      <div className="w-full">
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" className="w-full" name="email" />
      </div>
      <div className="w-full">
        <label htmlFor="senha">Senha:</label>
        <input id="senha" type="text" className="w-full" name="senha" />
      </div>
      <button className="bg-teal-500 p-2 w-full">Entrar</button>
      <p>{error.message}</p>
    </form>
  );
}
