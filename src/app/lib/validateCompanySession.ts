// app/lib/validateCompanySession.ts
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import logout from "@/actions/logout";

/**
 * Valida que:
 * - A empresa informada pela URL (por sua tag) existe.
 * - O usuário está autenticado e seu token contém a mesma empresa.
 *
 * Se a validação falhar, redireciona o usuário.
 * Se passar, retorna um objeto com os dados da empresa e do usuário.
 */
export async function validateCompanySession(empresaTag: string) {
  // Busca a empresa pela tag da URL
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Obtém os dados do usuário (incluindo o objeto 'empresa' presente no token)
  const userResult = await getUser();
  if (!userResult.ok || !userResult.data) {
    await logout(empresaTag);
    redirect(`/${empresaTag}/login`);
  }

  // Compara a tag da empresa da URL com a tag presente no token
  if (empresa.data.tag !== userResult.empresaToken.tag) {
    redirect(`/${userResult.empresaToken.tag}/protected/home`);
  }

  return { empresa: empresa.data, user: userResult.data };
}
