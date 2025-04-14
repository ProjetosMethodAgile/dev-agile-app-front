"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import { POST_REPLY_CHAMADO_KANBAN } from "@/functions/api";

export async function postReplyCardHelpdesk(
  inReplyTo: string,
  textBody: string,
  to_email: string,
  references: string,
) {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  // Decodifica o token e espera que ele contenha o objeto 'empresa'
  const usuarioData = jwt.decode(token) as TokenData;
  if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
    throw new Error("Token inválido");

  const { url } = POST_REPLY_CHAMADO_KANBAN();
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
        inReplyTo,
        textBody,
        to_email,
        references,
        identify_atendente: usuarioData.id,
      }),
    });
    revalidateTag("helpdesk-columns");
    revalidateTag("helpdesk-cards");

    console.log(response);

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Error in postCardHelpdeskAuth:", err);
    return { msg_success: "erro", success: false };
  }
}
