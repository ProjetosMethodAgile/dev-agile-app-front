"use server";

import { DELETE_MOTIVO } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deletaMotivoKanban(motivo_id: string) {
  try {
    if (!motivo_id) {
      return { msg_success: "erro", success: false, status: 400 };
    }

    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = DELETE_MOTIVO(motivo_id);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    revalidateTag("helpdesk-Motivos");
    revalidateTag("dash-helpdesk");

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    return { msg_success: "Motivo deletado com sucesso", success: true };
  } catch (err) {
    console.error("Erro ao deletar motivo:", err);
    return { msg_success: "erro", success: false };
  }
}
