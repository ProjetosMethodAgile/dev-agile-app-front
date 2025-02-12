// logout.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getEmpresaByTag from "./getEmpresaByTag";

export default async function logout(empresaTag: string) {
  const empresa = await getEmpresaByTag(empresaTag);
  (await cookies()).delete("token");
  if (empresa.ok) {
    redirect(`/${empresa.data.tag}`);
  } else {
    redirect("/");
  }
}
