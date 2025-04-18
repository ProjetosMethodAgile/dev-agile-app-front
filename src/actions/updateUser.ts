"use server";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

// Suponha que você crie essa função
import { PUT_USUARIO } from "@/functions/api";

export async function updateUser(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData,
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const id = formData.get("id") as string;
    const nome = formData.get("nome") as string;
    const contato = formData.get("contato") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;
    const status = formData.get("status") as string;
    const tipoUsuario = formData.get("tipo_usuario") as string;
    const permissionsCheckbox = formData.getAll("checkbox[]") as string[];

    function capitalize(str: string) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

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

    const errors: string[] = [];

    if (!tipoUsuario) {
      errors.push("Tipo de usuário é obrigatório.");
      return { errors, msg_success: "", success: false };
    }

    if (!id) {
      errors.push("ID do usuário não fornecido.");
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

    const { url } = PUT_USUARIO(id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        contato,
        senha,
        status: capitalize(status),
        roles_id: [tipoUsuario],
        permissoesCRUD: permissionsComplete,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      revalidateTag("update-user");
      return {
        success: true,
        errors: [],
        msg_success: data.message
          ? data.message
          : "Usuário atualizado com sucesso.",
      };
    } else {
      errors.push("Erro ao atualizar, contate o administrador do sistema.");
      return { success: false, errors, msg_success: "" };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
