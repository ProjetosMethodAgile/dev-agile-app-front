"use server";

import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AtendentesHelpDesk, TokenData } from "@/types/api/apiTypes";
import { GET_ALL_ATENDENTE_HELPDESK_BY_EMPRESA_ID } from "@/functions/api";

type AtendentesResponse = {
  atendentes: AtendentesHelpDesk[];
  error: boolean;
};

export default async function getAtendentesHelpDesk() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    const { url } = GET_ALL_ATENDENTE_HELPDESK_BY_EMPRESA_ID(
      usuarioData.empresa.id,
    );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
        tags: ["setor-helpdesk", "atendente-helpdesk"],
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar o usuário.");

    const data = (await response.json()) as AtendentesResponse;

    return { data: data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
