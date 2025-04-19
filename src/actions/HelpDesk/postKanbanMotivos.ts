"use server"
import { POST_MOTIVO } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";




export async function postMotivoKanbanHelpdesk(
  setor_id: string, 
  descricao: string,
  src_img: string,) {
    try {
      if (!setor_id||!descricao||!src_img) {      
        return { message: "preencha todas as informações corretamente", success: true, };
      } 

     const token = (await cookies()).get("token")?.value;
      if (!token) throw new Error("Token não encontrado");
      const { url } = POST_MOTIVO();
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          setor_id:setor_id,
          descricao:descricao,
          src_img:src_img
        }),
       
         });
          revalidateTag("helpdesk-Motivos");
  
    
    if (!response.ok) {
      return { msg_success: "erro", success: false, status: response.status };
    }
    
    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (err) {
    console.error("Error in postMotivoKanbanHelpdesk:", err);
    return { msg_success: "erro", success: false };
  }
}
