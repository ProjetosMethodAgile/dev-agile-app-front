"use server";

import { PUT_ORDEM_KANBAN_COLUNA } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function putOrdemColsHelpDesk(
  setorid: string,
  setorlist: {
    id: string;
    posicao: number;
  }[],
): Promise<{ error: string; data: string | null; ok: boolean }> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = PUT_ORDEM_KANBAN_COLUNA();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setor_id: setorid,
        setor_list: setorlist,
      }),
    });

    if (!response.ok)
      throw new Error(
        "Erro ao atualizar lista, contate o administrador do sistema",
      );
    revalidateTag("helpdesk-columns");

    const data: { message: string } = await response.json();

    return { data: data.message, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
