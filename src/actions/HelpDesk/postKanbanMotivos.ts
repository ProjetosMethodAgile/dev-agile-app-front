"use server"
import { POST_MOTIVO } from "@/functions/api";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import { revalidateTag } from "next/cache";

type PostMotivoParams =  {
  setor_id: string;  // ajuste o tipo conforme necessário
  descricao: string;
  src_img: string;
}

export async function postMotivoKanbanHelpdesk({
  setor_id,
  descricao,
  src_img
}: PostMotivoParams) {
  const { url } = POST_MOTIVO();
  if (!url) {
    throw new Error("URL inválida");
  }

  // Obtém o token dos cookies
  const tokenCookie = cookies();
  const token = tokenCookie.get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  // Decodifica o token e valida os dados essenciais
  const usuarioData = jwt.decode(token) as TokenData;
  if (!usuarioData || !usuarioData.id || !usuarioData.empresa) {
    throw new Error("Token inválido");
  }

  try {
    // Realiza a chamada à API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      next: {
        revalidate: 60,
        tags: ["helpdesk-cards"],
      },
      body: JSON.stringify({ setor_id, descricao, src_img }),
    });

    // Revalida a tag da coluna do helpdesk
    revalidateTag("helpdesk-columns");

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postMotivoKanbanHelpdesk:", err);
    return { msg_success: "erro", success: false };
  }
}
