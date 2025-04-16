"use server";
import { GET_MOTIVO } from "@/functions/api";
import apiError from "@/functions/api-error";
import { MotivoHelpDesk } from "@/types/api/apiTypes";

export default async function getMotivoSetor(setorId: string) {
  try {
    const { url } = GET_MOTIVO(setorId);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
      },
    });

    console.log(response);

    if (!response.ok) throw new Error("Erro ao pegar os dados da empresa.");
    const data = (await response.json()) as MotivoHelpDesk[];

    
    return { data: data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
