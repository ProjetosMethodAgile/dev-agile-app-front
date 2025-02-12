// app/[empresa]/home/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import LogoutButton from "@/components/logoutButton/logoutButton";

export default async function EmpresaHomePage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Verifica se o usuário está autenticado
  const { data: user, ok } = await getUser();
  if (!ok || !user) {
    // Se não autenticado, redireciona de volta para o login da empresa
    redirect(`/${empresaTag}`);
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
