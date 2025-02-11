"use server";

import { GET_USER_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData, UsuarioData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUser() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    const usuarioData = jwt.decode(token) as TokenData | null;
    if (!usuarioData || !usuarioData.id) throw new Error("token invalido");

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
    console.log(data);

    return { data: data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
