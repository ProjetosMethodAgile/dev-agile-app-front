"use server";

import { DELETE_USER_BY_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { TokenData, UsuarioData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function deleteUser(userIdToDelete: string | number) {
  const errors: string[] = [];
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token e espera que ele contenha o objeto 'empresa'
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
      throw new Error("Token inválido");

    const { url } = DELETE_USER_BY_ID(String(userIdToDelete));
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      next: {
        tags: ["new-user"],
      },
    });

    if (!response.ok) {
      errors.push("Erro ao deletar, contate o administrador do sistema");
      return {
        success: false,
        errors,
        msg_success: "",
      };
    }
    (await response.json()) as UsuarioData;
    revalidateTag("all-users");

    return {
      success: true,
      errors: [],
      msg_success: "Usuario Deletado com sucesso",
    };
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
