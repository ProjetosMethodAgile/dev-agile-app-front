"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ATIVA_ATTENDENT_HELPDESK } from "@/functions/api";
import { TokenData } from "@/types/api/apiTypes";

export async function ativaAtendenteHelpdesk(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");

    const usuarioData = jwt.decode(token) as TokenData;
    if (!usuarioData?.id || !usuarioData?.empresa)
      throw new Error("Token inválido.");

    const result = await ATIVA_ATTENDENT_HELPDESK(id);
    if (!result?.url) {
      return { msg_success: "erro", success: false };
    }

    const endpoint: string = result.url;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    revalidateTag("atendente-helpdesk");
    revalidateTag("setor-helpdesk");
    revalidateTag("dash-helpdesk");

    return await response.json();
  } catch (err) {
    console.error("Error in inativaAtendenteHelpdesk:", err);
    return { msg_success: "erro", success: false };
  }
}
