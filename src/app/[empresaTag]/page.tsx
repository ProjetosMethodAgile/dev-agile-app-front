import getEmpresaByTag from "@/actions/getEmpresaByTag";
import getUser from "@/actions/getUser";
import { redirect } from "next/navigation";

export default async function empresaDefaultPage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa pela tag
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/");
  }

  // Se o usuário já estiver autenticado, redireciona para a área protegida caso contrario manda para pagina de login
  const userResult = await getUser();
  if (userResult.ok && userResult.data) {
    redirect(`/${empresaTag}/protected/home`);
  } else {
    redirect(`/${empresaTag}/login`);
  }

  return <div></div>;
}
