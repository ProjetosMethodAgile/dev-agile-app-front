// app/lib/getUserPermissions.ts
import { cookies } from "next/headers";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { GET_PERMISSOES_ACOES_USER } from "@/functions/api";
import logout from "@/actions/logout";

export async function getUserPermissions(
  userId: string,
  empresaTag: string
): Promise<PermissaoCompletaData[] | null> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const { url } = GET_PERMISSOES_ACOES_USER(userId);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar permissões");
    }

    const data = await response.json();
    return data.permissoes;
  } catch (error) {

    logout(empresaTag);
    return null;
  }
}
