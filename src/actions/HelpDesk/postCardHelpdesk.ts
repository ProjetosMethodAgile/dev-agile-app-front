'use server'

import { POST_ORDEM_KANBAN_COLUNA } from "@/functions/api";

export async function postCardHelpdesk(
  setor_id: string,
  src_img_capa: string,
  titulo_chamado: string,
  status: string,
  descricao: string,
) {
  // Supondo que POST_ORDEM_KANBAN_COLUNA retorne um objeto com a propriedade "url"
  const urlObject = POST_ORDEM_KANBAN_COLUNA();

  if (!urlObject || !urlObject.url) {
    return { msg_success: "erro", success: false };
  }

  
  try {
    const response = await fetch(urlObject.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["helpdesk-cards"],
      },
      body: JSON.stringify({
        setor_id,
        src_img_capa,
        titulo_chamado,
        status,
        descricao,
      }),
    });

    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in postCardHelpdesk:", err);
    return { msg_success: "erro", success: false };
  }
}
