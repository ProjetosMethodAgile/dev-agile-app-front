"use server";

import { GET_USER_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData, UsuarioData, GetUserResult } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUser(): Promise<GetUserResult> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token e espera que ele contenha o objeto 'empresa'
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");

    const { url } = GET_USER_ID(usuarioData.id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Barrer " + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar o usuário.");
    const data = (await response.json()) as UsuarioData;

    // Valida se o usuário possui a empresa contida no token
    if (!data.usuario.empresa.some((e) => e.id === usuarioData.empresa.id)) {
      throw new Error("Usuário não pertence à empresa autenticada.");
    }

    return { data: data, ok: true, empresaToken: usuarioData.empresa };
  } catch (error) {
    return apiError(error);
  }
}
