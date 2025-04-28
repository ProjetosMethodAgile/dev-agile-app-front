"use server";

import { PUT_CARD_COLUMN } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function putPosicaoCardColumnid(
  card_id: string,
  new_column_id: string,
  setor_id: string,
): Promise<{ error: string; data: string | null; ok: boolean }> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado");
    console.log(card_id);
    console.log(new_column_id);

    const { url } = PUT_CARD_COLUMN();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_id,
        new_column_id,
        setor_id,
      }),
    });

    if (!response.ok)
      throw new Error(
        "Erro ao atualizar card, contate o administrador do sistema",
      );

    revalidateTag("helpdesk-columns");
    revalidateTag("helpdesk-cards");

    const data: { message: string } = await response.json();
    return { data: data.message, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
