"use server";

import { Login } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setLogin(dataLogin: { email: string; senha: string }) {
  const response = await fetch("https://devagile.com.br/api/usuario/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: dataLogin.email,
      senha: dataLogin.senha,
    }),
  });

  const login: Login = await response.json();

  if (!response.ok) {
    return login;
  }

  if (login.token) {
    (await cookies()).set("token", login.token, {
      httpOnly: true,
      secure: true,
    });
    redirect("/home");
  }

  return { message: login.message, error: false };
}
