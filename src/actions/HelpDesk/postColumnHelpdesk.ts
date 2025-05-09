"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import { POST_CREATE_COLUMN_KANBAN } from "@/functions/api";

export async function postColumnHelpdesk(
  nome: string,
  setor_id: string,
  id_acao: string,
) {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  // Decodifica o token e espera que ele contenha o objeto 'empresa'
  const usuarioData = jwt.decode(token) as TokenData;
  if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
    throw new Error("Token inválido");

  const { url } = POST_CREATE_COLUMN_KANBAN();
  if (!url || !url) {
    return { msg_success: "erro", success: false };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        nome,
        setor_id,
        id_acao,
      }),
    });
    revalidateTag("helpdesk-columns");
    revalidateTag("helpdesk-cards");
    revalidateTag("dash-helpdesk");

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postCardHelpdeskAuth:", err);
    return { msg_success: "erro", success: false };
  }
}
