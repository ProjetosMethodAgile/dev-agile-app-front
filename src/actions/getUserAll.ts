"use server";

import { GET_USER_ALL } from "@/functions/api";
import apiError from "@/functions/api-error";
import { UsuariosData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";

//Busca todos os usuarios do sistema
export default async function getUserAll() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const { url } = GET_USER_ALL();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error("Erro ao pegar o usuários.");
    const data = (await response.json()) as UsuariosData;

    return { data: data.usuarios, ok: true, error: null };
  } catch (error) {
    return apiError(error);
  }
}
