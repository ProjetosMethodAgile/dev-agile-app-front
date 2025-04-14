"use server";

import { GET_PERMISSIONS_BY_ROLE_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

//Busca todos os usuarios do sistema
export default async function getPermissionsByRoleId(role_id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const { url } = GET_PERMISSIONS_BY_ROLE_ID(role_id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error("Erro ao pegar roles.");
    const { permissoes } = await response.json();

    return { data: permissoes, ok: true, error: null };
  } catch (error) {
    return apiError(error);
  }
}
