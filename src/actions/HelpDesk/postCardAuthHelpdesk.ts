"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import { POST_AUTH_CHAMADO_KANBAN_COLUNA } from "@/functions/api";

export async function postCardAuthHelpdesk(
  setor_id: string,
  src_img_capa: string,
  titulo_chamado: string,
  status: string,
  descricao: string,
) {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  // Decodifica o token e espera que ele contenha o objeto 'empresa'
  const usuarioData = jwt.decode(token) as TokenData;
  if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
    throw new Error("Token inválido");

  const { url } = POST_AUTH_CHAMADO_KANBAN_COLUNA();
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
      next: {
        revalidate: 60,
        tags: ["helpdesk-cards"],
      },
      body: JSON.stringify({
        setor_id,
        src_img_capa,
        titulo_chamado,
        status,
        descricao,
        usuario_id: usuarioData.id,
      }),
    });
    revalidateTag("helpdesk-columns");
    revalidateTag("helpdesk-cards");

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
