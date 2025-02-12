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

  // Busca os dados da empresa conforme a rota (empresa acessada)
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Obtém os dados do usuário
  const userResult = await getUser();
  if (!userResult.ok || !userResult.data) {
    // Se não autenticado, redireciona de volta para o login da empresa da URL
    logout(empresaTag);
    redirect(`/${empresaTag}`);
  }

  // Agora temos certeza de que userResult é do tipo GetUserSuccess
  const { data: user, empresaToken } = userResult;

  // Valida se a empresa da rota (empresa.data.id) bate com a empresa no token
  if (empresa.data.id !== empresaToken) {
    // Procura, no array de empresas do usuário, a empresa que bate com o token
    const empresaCorreta = user.usuario.empresa.find(
      (e) => e.id === empresaToken
    );
    if (empresaCorreta) {
      // Redireciona para a home da empresa correta
      redirect(`/${empresaCorreta.tag}/home`);
    } else {
      // Caso não encontre, força o logout e redireciona para a raiz
      logout(empresaTag);
      redirect("/");
    }
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
