"use server"
import { PEGA_USUARIO } from "@/functions/api";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import apiError from "@/functions/api-error";
import { HelpDeskSetoresPorAtendenteAtivos, TokenData } from "@/types/api/apiTypes";

export async function getStatusForUserID() {
    try{
 
     const token = (await cookies()).get("token")?.value;
        if (!token) throw new Error("Token não encontrado.");
        const usuarioData = jwt.decode(token) as TokenData;

     if (!usuarioData || !usuarioData.id || !usuarioData.empresa)
          throw new Error("Token inválido");
        const { url } = PEGA_USUARIO(
          usuarioData.id,
          usuarioData.empresa.id
        );
        const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
            next: {
           
              tags: ["helpdesk-kanban","setor-helpdesk","atendente-helpdesk","helpdesk-columns"],
       
            },
          });
    const data = await response.json();
    const dataStatus = data.status 
        return dataStatus
      } catch (error) {
        return apiError(error);
      }
}