import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import LogoutButton from "@/components/logoutButton/logoutButton";
import logout from "@/actions/logout";

export default async function EmpresaHomePage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa conforme a URL
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Obtém os dados do usuário e o objeto empresa do token
  const userResult = await getUser();
  if (!userResult.ok || !userResult.data) {
    logout(empresaTag);
    redirect(`/${empresaTag}`);
  }

  const { data: user, empresaToken } = userResult;

  // Compara a tag da empresa na URL com a tag armazenada no token
  if (empresa.data.tag !== empresaToken.tag) {
    // Se houver divergência, redireciona para a rota correta (aquela contida no token)
    redirect(`/${empresaToken.tag}/home`);
  }

  return (
    <main
      className="p-6"
      style={{ backgroundColor: empresa.data?.cor_primaria }}
    >
      <h1 style={{ color: empresa.data?.cor_secundaria }}>
        Bem-vindo, {user.usuario.nome}
      </h1>
      <LogoutButton />
    </main>
  );
}
