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
    <main className="mx-60 flex h-screen gap-10 dark:text-white max-lg:flex-col max-lg:items-center max-lg:mx-6 max-lg:gap-0 max-lg:px-2 max-sm:p-0 max-sm:mx-2 max-sm:h-full">
      <div className="animate-move-right-to-left mt-28 max-lg:mt-10 ">
      <h1 className="text-7xl font-bold text-title mb-5 max-xl:text-5xl max-lg:mb-4 max-sm:text-3xl ">Bem&nbsp;vindo de volta</h1>
      <p className="text-3xl text-gray-200 max-w-140 max-xl:text-xl max-lg:hidden">Faça login para acessar
      as funcionalidades da plataforma.</p>
      </div>
      <FormWrapper empresa={empresa.data} />
    </main>
  );
}
