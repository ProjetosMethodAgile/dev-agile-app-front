// app/[empresa]/login/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import FormComponent from "@/components/form/form";

export default async function EmpresaLoginPage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa pela tag
  const empresa = await getEmpresaByTag(empresaTag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Se o usuário já estiver autenticado, redireciona para a área protegida
  const userResult = await getUser();
  if (userResult.ok && userResult.data) {
    redirect(`/${empresaTag}/protect/home`);
  }

  return (
    <main
      className="flex gap-3 justify-center items-center h-screen"
      // Você pode usar as cores da empresa para personalizar o fundo:
      // style={{ backgroundColor: empresa.data.cor_secundaria }}
    >
      <div>
        <img src={empresa.data.logo} alt={empresa.data.nome} />
      </div>
      <FormComponent empresa={empresa.data} />
    </main>
  );
}
