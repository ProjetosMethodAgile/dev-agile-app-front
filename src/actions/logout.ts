"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getEmpresaByTag from "./getEmpresaByTag";

// Extraímos o parâmetro 'empresa' a partir de props.params

// Busca os dados da empresa pelo tag

export default async function logout(tagEmpresa: string) {
  const empresa = await getEmpresaByTag(tagEmpresa);
  (await cookies()).delete("token");
  if (empresa.ok) {
    redirect(`/${empresa.data.tag}`);
  } else {
    redirect("/");
  }
}
