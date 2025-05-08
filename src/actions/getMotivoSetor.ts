"use server";
import { GET_MOTIVO } from "@/functions/api";
import apiError from "@/functions/api-error";
import { MotivoHelpDesk } from "@/types/api/apiTypes";
import { revalidateTag } from "next/cache";

export default async function getMotivoSetor(setorId: string) {
  try {
    const { url } = GET_MOTIVO(setorId);
    const response = await fetch(url, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["helpdesk-Motivos"],
      },
    });

    if (!response.ok) throw new Error("Erro ao pegar os dados da empresa.");
    const data = (await response.json()) as MotivoHelpDesk[];

    revalidateTag("helpdesk-Motivos");
    console.log(data);

    return { data: data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
