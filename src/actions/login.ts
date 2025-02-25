"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GET_VERIFYPARAMETROS_EMPRESA, POST_LOGIN } from "@/functions/api";
import VALIDA_EMPRESA_POR_ID from "./getEmpresaById";




export async function setLogin( formData: FormData,): Promise<void> {
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
    });
    
    redirect(`/${empresaTag}/protect/home`);
  } else {
    console.error("Erro: Token de login não recebido");
  }
}else{
  const empresaId = formData.get("empresaId") as string;
  console.log(empresaId);
  
   const response = await VALIDA_EMPRESA_POR_ID(empresaId)


if (response !== 200) {
  return redirect(`/${empresaTag}/login`);
}
redirect(`/${empresaTag}/chamados-nao-login`);



}
}
