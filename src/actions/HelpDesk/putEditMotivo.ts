"use server"
import { PUT_MOTIVO } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export async function atualizamotivoPorID(nomeMotivoSelecionado: string, id: string,urlMotivo:string) {
  try {
    if (!nomeMotivoSelecionado || !id) {
      return { msg_success: "erro", success: false, status: 400 };
    }
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = PUT_MOTIVO(id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        descricao: nomeMotivoSelecionado,
        src_img:urlMotivo
        
      })
    });
    revalidateTag("helpdesk-Motivos");

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    return { msg_success: "Motivo deletado com sucesso", success: true };
  } catch (err) {
    console.error("Erro ao deletar motivo:", err);
    return { msg_success: "erro", success: false };
  }
}
