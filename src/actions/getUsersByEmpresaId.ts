"use server";

import { GET_USERS_BY_EMP_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData, UsuariosData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

//Busca todos os usuarios do sistema baseado na empresa
export default async function getUsersByEmpresaId() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");

    const { url } = GET_USERS_BY_EMP_ID(usuarioData.empresa.id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        tags: ["all-users"],
      },
    });

    if (!response.ok) throw new Error("Erro ao pegar o usuários.");
    const data = (await response.json()) as UsuariosData;

    return { data: data.usuarios, ok: true, error: null };
  } catch (error) {
    return apiError(error);
  }
}
