"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GET_KANBAN_STATUS_HISTORIES } from "@/functions/api";
import apiError from "@/functions/api-error";
import { KanbanHistory, TokenData } from "@/types/api/apiTypes";

/**
 * Busca o histórico de status do Kanban autenticado via JWT do cookie.
 *
 * @returns Promise com { data: KanbanHistory[]; ok: true } ou objeto de erro.
 */
export default async function getKanbanStatusHistories(): Promise<
  | { data: KanbanHistory[]; ok: true }
  | { ok: false; error: string; statusCode?: number }
> {
  try {
    // Recupera token do cookie
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return { ok: false, error: "Token não encontrado.", statusCode: 401 };
    }

    // Verifica e decodifica JWT usando segredo
    let userData: TokenData;
    try {
      userData = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
    } catch (e) {
      console.log(e);

      return {
        ok: false,
        error: "Token inválido ou expirado.",
        statusCode: 401,
      };
    }

    // Valida payload mínimo
    if (!userData.id || !userData.empresa) {
      return { ok: false, error: "Token malformado.", statusCode: 401 };
    }

    // Chama a API autenticada
    const { url } = GET_KANBAN_STATUS_HISTORIES(userData.empresa.id);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
        tags: ["kanban-histories"],
      },
    });

    if (!response.ok) {
      const message = `Erro ao buscar históricos de Kanban:`;
      return { ok: false, error: message, statusCode: response.status };
    }

    // Extrai e retorna dados
    const data = (await response.json()) as KanbanHistory[];
    return { data, ok: true };
  } catch (error) {
    return apiError(error);
  }
}
