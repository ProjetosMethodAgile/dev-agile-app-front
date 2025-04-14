"use server";

import { CardHelpDesk, TokenData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";
import { GET_KANBAN_CARDS_BY_SETOR_ID } from "@/functions/api";
import { revalidateTag } from "next/cache";

export default async function getCardsHelpDeskBySetorId(setor_id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");
    const { url } = GET_KANBAN_CARDS_BY_SETOR_ID(setor_id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
      // next: {
      //   revalidate: 60,
      //   tags: ["helpdesk-cards"],
      // },
    });

    const data: { cards: CardHelpDesk[] } = await response.json();
    const cards = data.cards;
    return { data: cards, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
