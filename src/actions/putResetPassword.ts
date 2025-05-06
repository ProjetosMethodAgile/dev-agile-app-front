"use server";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

// Suponha que você crie essa função
import { PUT_PASSWORD_RESET } from "@/functions/api";

type updatePasswordPayload = {
  id?: string;
  primeiro_acesso: boolean;
  email: string;
  empresa_id: string;
};

export async function putResetPassword(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData,
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  try {
    const id = formData.get("id") as string;
    const email = formData.get("email") as string;
    const empresa_id = formData.get("empresa_id") as string;
    const primeiro_acesso = formData.get("primeiro_acesso") as string;

    const errors: string[] = [];

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
    const payload: updatePasswordPayload = {
      primeiro_acesso: true,
      empresa_id,
      email,
    };

    const { url } = PUT_PASSWORD_RESET(id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      revalidateTag("update-user");
      if (primeiro_acesso === "Não") {
        (await cookies()).set("first-acess", "false", {
          httpOnly: true,
          secure: true,
        });

      }
      return {
        success: true,
        errors: [],
        msg_success: data.message ? data.message : "Senha enviada com sucesso.",
      };
    } else {
      errors.push(
        "Erro ao atualizar senha, contate o administrador do sistema.",
      );
      console.log(await response.json());
      return { success: false, errors, msg_success: "" };
    }
  } catch (error) {
    apiError(error);
    throw new Error("Ocorreu um erro, tente novamente.");
  }
}
