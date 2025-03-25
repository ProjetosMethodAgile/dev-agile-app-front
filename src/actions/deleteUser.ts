"use server";

import { DELETE_USER_BY_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData, UsuarioData} from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function deleteUser(userIdToDelete: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token e espera que ele contenha o objeto 'empresa'
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");

    const { url } = DELETE_USER_BY_ID(userIdToDelete);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        tags: ["new-user"],
      },
    });
    console.log(response);
    if (!response.ok) throw new Error("Erro ao deletar usuário.");
    const data = (await response.json()) as UsuarioData;

    // Valida se o usuário possui a empresa contida no token
    if (!data.usuario.empresa.some((e) => e.id === usuarioData.empresa.id)) {
      throw new Error("Usuário não pertence à empresa autenticada.");
    }

    return { data, ok: true, empresaToken: usuarioData.empresa };
  } catch (error) {
    return apiError(error);
  }
}
