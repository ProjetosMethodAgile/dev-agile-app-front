"use server"

import { GET_ACOES_KANBAN } from "@/functions/api";
import apiError from "@/functions/api-error";
import { AcaoColuna, TokenData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function BUSCA_ACOES_COLUNA() {
  try {
    // Obtém o token dos cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    // Decodifica o token
    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData || !usuarioData.id || !usuarioData.empresa) {
      throw new Error("Token inválido.");
    }

    
    const { url } = await GET_ACOES_KANBAN(usuarioData.empresa.id);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar ações`);
    }

    const acaoColuna: AcaoColuna = await response.json();
    
    return {
      data: acaoColuna,
      ok: true,
      error: "",
    };
  } catch (error) {
    return apiError(error);
  }
}
