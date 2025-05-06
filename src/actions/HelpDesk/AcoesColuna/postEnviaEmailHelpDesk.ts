"use server";

import { POST_SEND_EMAIL_ACAO_KANBAN } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function postEnviaEmailHelpDesk(
  cardId: string,
  columnName: string,
) {
  try {
    // Obtém o token dos cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa) {
      throw new Error("Token inválido.");
    }

    const { url } = POST_SEND_EMAIL_ACAO_KANBAN();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        card_id: cardId,
        column_nome: columnName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar ações`);
    }

    return {
      data: "email enviado",
      ok: true,
      error: "",
    };
  } catch (error) {
    return apiError(error);
  }
}
