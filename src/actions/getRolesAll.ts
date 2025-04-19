"use server";

import { GET_ROLES_ALL } from "@/functions/api";
import apiError from "@/functions/api-error";
import { RoleData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";

//Busca todos os usuarios do sistema
export default async function getRolesAll() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const { url } = GET_ROLES_ALL();
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
    const dataRole = (await response.json()) as RoleData[];
    const data = dataRole.filter((role) => role.id !== process.env.ROLE_MASTER_ID);
  
    return { data: data, ok: true, error: null };
  } catch (error) {
    return apiError(error);
  }
}
