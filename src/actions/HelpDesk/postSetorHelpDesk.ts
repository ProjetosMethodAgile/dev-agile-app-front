"use server";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "@/types/api/apiTypes";
import logout from "../logout";
import { POST_SETOR_HELPDESK } from "@/functions/api";
import { revalidateTag } from "next/cache";

// Defina explicitamente o tipo de retorno esperado
export async function postSetorHelpDesk(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData,
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  const nomeSetor = formData.get("nome") as string;
  const empTag = formData.get("emptag") as string;
  const email_setor = formData.get("email_setor") as string;
  const errors: string[] = [];

  if (!nomeSetor || nomeSetor.trim().length <= 2) {
    errors.push("Insira no mínimo 3 caracteres");
  }

  if (errors.length > 0) {
    return { errors, msg_success: "", success: false };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      await logout(empTag);
      return { errors, msg_success: "", success: false };
    }
    const usuarioData = jwt.decode(token) as TokenData;

    const { url } = await POST_SETOR_HELPDESK();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeSetor,
        empresa_id: usuarioData.empresa.id,
        email_setor: email_setor,
      }),
    });
    if (response.ok) {
      revalidateTag("setor-helpdesk");
      revalidateTag("dash-helpdesk");

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
