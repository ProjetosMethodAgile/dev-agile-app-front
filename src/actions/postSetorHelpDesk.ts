import apiError from "@/functions/api-error";

export async function postSetorHelpDesk(formData: FormData): Promise<void> {
  try {
    const nomeSetor = formData.get("nome") as string;

    if (nomeSetor.length <= 2) {
      throw new Error("Insira no mínimo 2 caracteres");
    }
  } catch (error) {
    apiError(error);
  }
}
