"use server";
import { POST_MOTIVO } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function postMotivoKanbanHelpdesk(
  setor_id: string,
  descricao: string,
  src_img: string,
  sla_minutes: number,
) {
  try {
    // validação básica
    if (!setor_id || !descricao || sla_minutes == null || sla_minutes <= 0) {
      return {
        message:
          "Preencha todos os campos corretamente (incluindo prazo em minutos).",
        success: false,
      };
    }

    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = POST_MOTIVO();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setor_id,
        descricao,
        src_img,
        sla_minutes,
      }),
    });

    revalidateTag("helpdesk-Motivos");

    if (!response.ok) {
      return {
        message: "Erro ao cadastrar motivo",
        success: false,
        status: response.status,
      };
    }

    const data = await response.json();
    return { ...data, success: true };
  } catch (err) {
    console.error("Error in postMotivoKanbanHelpdesk:", err);
    return { message: "Erro no servidor", success: false };
  }
}
