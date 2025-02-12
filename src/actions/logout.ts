// logout.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getEmpresaByTag from "./getEmpresaByTag";

export default async function logout(empresaTag: string) {
  const empresa = await getEmpresaByTag(empresaTag);
  const cookie = (await cookies()).get("token");
  if (cookie) {
    (await cookies()).delete("token");
  }
  if (empresa.ok) {
    redirect(`/${empresa.data.tag}/login`);
  } else {
    redirect("/");
  }
}
