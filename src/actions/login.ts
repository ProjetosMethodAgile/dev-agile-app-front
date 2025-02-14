"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/types/api/apiTypes";
import { POST_LOGIN } from "@/functions/api";

export async function setLogin(dataLogin: {
  email: string;
  senha: string;
  empresaTag: string;
  empresaId: string;
}) {
  const { url } = POST_LOGIN();

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(dataLogin),
  });

  // Verifica o content-type da resposta
  const contentType = response.headers.get("content-type");
  let login: Login;

  if (contentType && contentType.includes("application/json")) {
    login = await response.json();
  } else {
    // Caso o servidor retorne HTML, captura o texto para debug
    const text = await response.text();
    console.error("Erro: Esperava JSON mas recebeu:", text);
    return { message: "Erro inesperado no servidor", error: true };
  }

  if (!response.ok) {
    return login;
  }

  if (login.token) {
    (await cookies()).set("token", login.token, {
      httpOnly: true,
      secure: true,
    });
    redirect(`/${dataLogin.empresaTag}/protect/home`);
  }

  return { message: login.message, error: false };
}
