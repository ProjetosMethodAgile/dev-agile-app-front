// app/actions/getEmpresaByTag.ts
"use server";

import { GET_EMPRESA_TAG } from "@/functions/api";
import apiError from "@/functions/api-error";
import { EmpresaData } from "@/types/api/apiTypes";

export default async function getEmpresaByTag(tag: string) {
  try {
    const { url } = GET_EMPRESA_TAG(tag);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar os dados da empresa.");
    const data = (await response.json()) as EmpresaData;
    return { data: data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
