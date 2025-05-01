"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { POST_LOGIN } from "@/functions/api";
import VALIDA_EMPRESA_POR_ID from "./getEmpresaById";

export async function setLogin(formData: FormData): Promise<void> {
  const action = formData.get("action") as string;
  const empresaTag = formData.get("empresaTag") as string;
  if (action === "entrar") {
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;
    const empresaTag = formData.get("empresaTag") as string;
    const empresaId = formData.get("empresaId") as string;

    if (!email || !senha || !empresaTag || !empresaId) {
      console.error("Erro: Campos obrigatórios não preenchidos");
      return;
    }

    const { url } = POST_LOGIN();

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, senha, empresaTag, empresaId }),
    });

    if (!response.ok) {
      console.error("Erro ao autenticar:", response.statusText);
      return;
    }

    const login = await response.json();
   

    if (login.token) {
      (await cookies()).set("token", login.token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      if(login.primeiroAcesso){
        console.log(login)
        redirect(`/${empresaTag}/protect/criar-senha`);
      }

      redirect(`/${empresaTag}/protect/home`);
    } else {
      console.error("Erro: Token de login não recebido");
    }
  } else {
    const empresaId = formData.get("empresaId") as string;

    const response = await VALIDA_EMPRESA_POR_ID(empresaId);

    if (response !== 200) {
      return redirect(`/${empresaTag}/login`);
    }
    redirect(`/${empresaTag}/chamados-nao-login`);
  }
}
