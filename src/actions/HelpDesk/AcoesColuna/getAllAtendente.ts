'use server'
import { PEGA_TODOS_ATENDNETES } from "@/functions/api";
import { HelpDeskSetoresPorAtendenteAtivos, TokenData } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";

export async function pegaTodosAtendente() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) throw new Error("Token não encontrado.");
             
                const usuarioData = jwt.decode(token) as TokenData;
        
        if (!usuarioData || !usuarioData.id || !usuarioData.empresa)

 
          
            throw new Error("Token inválido");
        const  result = await PEGA_TODOS_ATENDNETES(usuarioData.empresa.id)
        if (!result?.url) {
            return { msg_success: "erro", success: false };
          }

          
          const endpoint: string = result.url;
         
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          next: {
           
            tags: ["atendente-helpdesk","setor-helpdesk"],
          },
        });
        
        
        const data: HelpDeskSetoresPorAtendenteAtivos[] = await response.json();
        return { data, ok: true, error: "" };
      } catch (error) {
        return apiError(error);
      }
}