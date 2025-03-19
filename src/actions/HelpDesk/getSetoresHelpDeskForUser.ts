"use server";

import { HelpDeskSetoresPorAtendente, TokenData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";
import { GET_SETOR_HELPDESK_FOR_USER } from "@/functions/api";

export default async function getSetoresHelpDeskForUser() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");
    const { url } = GET_SETOR_HELPDESK_FOR_USER(
      usuarioData.id,
      usuarioData.empresa.id,
    );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
        tags: ["helpdesk-kanban"],
      },
    });

    const data: HelpDeskSetoresPorAtendente = await response.json();
    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
