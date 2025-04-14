"use server";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";

import { POST_USUARIO } from "@/functions/api";
import { revalidateTag } from "next/cache";

export async function postUser(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData,
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const nome = formData.get("nome") as string;
    const contato = formData.get("contato") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;
    const tipoUsuario = formData.get("tipo_usuario") as string;
    const permissionsCheckbox = formData.getAll("checkbox[]") as string[];

    // Processa os dados corretamente para um array de permissões
    const permissionsObject = permissionsCheckbox
      ?.map((permission) => {
        try {
          return JSON.parse(permission) as Record<
            string,
            {
              screenId: string;
              access: boolean;
              crud?: { create?: boolean; update?: boolean; delete?: boolean };
            }
          >;
        } catch (e) {
          console.log(e);
          console.error("Erro ao fazer parse do JSON:", permission);
          return null;
        }
      })
      .filter(Boolean);

    console.log("permissionsObject", permissionsObject[0]);

    // Transforma o objeto aninhado em um array com os valores corretos
    const permissionsComplete = Object.values(permissionsObject[0] ?? {}).map(
      (permission) => ({
        permissao_id: permission.screenId,
        acessos: {
          can_read: !!permission.access,
          can_create: !!permission.crud?.create,
          can_update: !!permission.crud?.update,
          can_delete: !!permission.crud?.delete,
        },
        acoes: [],
      }),
    );

    console.log("permissionsComplete", permissionsComplete);

    const errors: string[] = [];

    if (!tipoUsuario) {
      errors.push("Tipo de usuario é obrigatório.");
      return { errors, msg_success: "", success: false };
    }

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return {
        errors: ["Usuário não autenticado"],
        msg_success: "",
        success: false,
      };
    }

    const usuarioData = jwt.decode(token) as TokenData;

    const { url } = await POST_USUARIO();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        contato,
        senha,
        roles_id: [tipoUsuario],
        permissoes: permissionsComplete,
        empresa_id: usuarioData.empresa.id,
      }),
    });
    if (response.ok) {
      revalidateTag("new-user");
      return {
        success: true,
        errors: [],
        msg_success: "Usuário cadastrado com sucesso.",
      };
    } else {
      errors.push("Erro ao cadastrar, contate o administrador do sistema.");
      return { success: false, errors, msg_success: "" };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
