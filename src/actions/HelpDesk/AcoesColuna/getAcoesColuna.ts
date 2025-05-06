"use server";

import { GET_KEANBAN_ACOES_COLUNA } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ColumnsHelpDesk, TokenData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAcoesColuna(id: string) {
  try {
    // Obtém o token dos cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa) {
      throw new Error("Token inválido.");
    }

    const { url } = GET_KEANBAN_ACOES_COLUNA(id);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar ações`);
    }

    const acaoColuna: ColumnsHelpDesk = await response.json();

    return {
      data: acaoColuna,
      ok: true,
      error: "",
    };
  } catch (error) {
    return apiError(error);
  }
}
