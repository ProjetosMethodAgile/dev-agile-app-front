// actions/login.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/types/api/apiTypes";
import { POST_LOGIN } from "@/functions/api";

export async function setLogin(dataLogin: {
  email: string;
  senha: string;
  empresaTag: string;
}) {
  const { url } = POST_LOGIN();
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(dataLogin),
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
    redirect(`/${dataLogin.empresaTag}/home`);
  }

  return { message: login.message, error: false };
}
