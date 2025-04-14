"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import { POST_VINCULA_ATEND_CARD } from "@/functions/api";

export async function postVinculaAtendenteToCardHelpdesk(sessao_id: string) {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  // Decodifica o token e espera que ele contenha o objeto 'empresa'
  const usuarioData = jwt.decode(token) as TokenData;
  if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
    throw new Error("Token inválido");

  const { url } = POST_VINCULA_ATEND_CARD(sessao_id);
  if (!url || !url) {
    return { message: "erro", success: false };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ usuario_id: usuarioData.id }),
    });
    revalidateTag("helpdesk-cards");

    console.log(response);

    if (!response.ok) {
      return {
        message: "erro ao vincular",
        success: false,
        status: response.status,
      };
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return { message: "erro", success: false };
  }
}
