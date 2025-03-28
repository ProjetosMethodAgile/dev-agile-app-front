"use server";

import { CardHelpDeskSessao, TokenData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";
import { GET_KANBAN_CARD_BY_ID } from "@/functions/api";

export default async function getCardHelpDeskId(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");
    const { url } = GET_KANBAN_CARD_BY_ID(id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
        tags: ["helpdesk-cards"],
      },
    });
    const card: CardHelpDeskSessao = await response.json();
    return { data: card, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
