"use server";

import { ColumnsHelpDesk, TokenData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";
import { GET_KANBAN_COLUNAS_BY_SETOR_EMP_ID } from "@/functions/api";

export default async function getColumnsHelpDeskForUser(setor_id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");
    const { url } = GET_KANBAN_COLUNAS_BY_SETOR_EMP_ID(
      setor_id,
      usuarioData.empresa.id,
    );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
        tags: ["helpdesk-columns"],
      },
    });
    const data: ColumnsHelpDesk[] = await response.json();

    data.sort((a, b) => Number(a.posicao) - Number(b.posicao));
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
