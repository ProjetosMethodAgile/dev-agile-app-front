"use server";

import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData, usuariosDisponiveisHelpDesk } from "@/types/api/apiTypes";
import { GET_USUARIOS_NAO_ATENDENTE_HELPDESK } from "@/functions/api";

type usuariosResponse = {
  usuarios: usuariosDisponiveisHelpDesk[];
  error: string;
};
export default async function getUsuariosNaoAtendenteHelpDesk() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData;

    const { url } = GET_USUARIOS_NAO_ATENDENTE_HELPDESK(usuarioData.empresa.id);
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

    const data = (await response.json()) as usuariosResponse;

    return { data: data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
