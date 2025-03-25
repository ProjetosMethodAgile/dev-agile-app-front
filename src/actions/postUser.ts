 "use server";
 import apiError from "@/functions/api-error";
 import { cookies } from "next/headers";
 import jwt from "jsonwebtoken";
 import {
   PermissaoCompletaData,
   PermissaoUserData,
   TokenData,
 } from "@/types/api/apiTypes";
  import logout from "./logout";
 import { POST_USUARIO } from "@/functions/api";
 import { revalidateTag } from "next/cache";
  import { redirect } from "next/dist/server/api-utils";
  import { access } from "node:fs";

  //Defina explicit amente o tipo de retorno esperado
 export async function postUser(
   state:
     | { errors: string[]; msg_success: string; success: boolean }
     | undefined,
   formData: FormData,
 ): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
   const nome = formData.get("nome") as string;
   const contato = formData.get("contato") as string;
   const email = formData.get("email") as string;
   const senha = formData.get("senha") as string;
   const tipoUsuario = formData.get("tipo_usuario") as string;
   const permissionsCheckbox = formData.getAll("checkbox[]") as string[] | null;
   const permissionsObject= permissionsCheckbox?.map((permission)=> JSON.parse(permission)) 
   const permissionsComplete = permissionsObject?.map(permission=>{
      return {
        permissao_id: permission.screen_id,
        acessos:{
          can_read: permission.crud.checked,
          can_create: permission.crud.create.status,
          can_update: permission.crud.update.status,
          can_delete: permission.crud.delete.status
        },
        acoes: []
      }
   })
   
   const errors: string[] = [];
   

   if (errors.length > 0) {
     return { errors, msg_success: "", success: false };
   }

   try {
     const token = (await cookies()).get("token")?.value;
     if (!token) {
       return { errors, msg_success: "", success: false };
     }
     const usuarioData = jwt.decode(token) as TokenData;

     const { url } = await POST_USUARIO();
     const response = await fetch(url, {
       method: "POST",
       headers: {
         Authorization: "Bearer " + token,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         nome: nome,
         email: email,
         contato: contato,
         senha: senha,
         roles_id: [tipoUsuario],
         permissoes: permissionsComplete,
         empresa_id: usuarioData.empresa.id,
       }),
     });

     if (response.ok) {
       const json = await response.json();
       revalidateTag("new-user");
       return {
         success: true,
         errors: [],
         msg_success: "cadastro realizado com sucesso",
       };
     } else {
       errors.push("Erro ao cadastrar, contate o administrador do sistema");
       return {
         success: false,
         errors,
         msg_success: "",
       };
     }
   } catch (error) {
     apiError(error);
      //Lança a exceção para que o hook possa capturá-la
     throw new Error("Ocorreu um erro, tente novamente.");
   }
 }
