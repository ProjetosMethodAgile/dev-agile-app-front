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

// Defina explicit amente o tipo de retorno esperado
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
  const errors: string[] = [];
  const permissions: PermissaoUserData[] = [];
  permissionsCheckbox?.map((permission) => {
    const { id, acessos, acoes }: PermissaoCompletaData =
      JSON.parse(permission);

    const newPermission = {
      permissao_id: id,
      acessos: {
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      },
      acoes: acoes,
    };
    permissions.push(newPermission);
  });

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
        nome: "nome",
        email: "email",
        contato: "contato",
        senha: "senha",
        roles_id: [tipoUsuario],
        permissoes: permissions,
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
    // Lança a exceção para que o hook possa capturá-la
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
