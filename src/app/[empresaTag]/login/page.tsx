// app/[empresa]/login/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import FormWrapper from "@/components/form/FormWrapper";

export default async function EmpresaLoginPage({
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

  // Se o usuário já estiver autenticado, redireciona para a área protegida
  const userResult = await getUser();
  if (userResult.ok && userResult.data) {
    redirect(`/${empresaTag}/protect/home`);
  }

  return (
    <main className="mx-60 flex h-screen flex-wrap items-center justify-between gap-10 dark:text-white">
      <div className="animate-move-right-to-left">
        <h1 className="text-8xl font-bold">Bem vindo</h1>
        <h1 className="text-8xl font-bold">de volta</h1>
        <p className="text-3xl font-bold">Faça login para acessar</p>
        <p className="text-3xl font-bold">as funcionalidades da</p>
        <p className="text-3xl font-bold">plataforma</p>
      </div>
      <FormWrapper empresa={empresa.data} />
    </main>
  );
}
