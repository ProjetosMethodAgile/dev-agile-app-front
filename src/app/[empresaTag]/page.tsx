// app/[empresa]/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import FormComponent from "@/components/form/form";

export default async function EmpresaLoginPage({
  params,
}: {
  params: { empresaTag: string };
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa pelo tag
  const empresa = await getEmpresaByTag(empresaTag);

  if (!empresa.ok || !empresa.data) {
    redirect("/");
  }

  const { data: user, ok } = await getUser();
  if (ok && user) {
    redirect(`/${empresaTag}/home`);
  }

  return (
    <main
      className="flex gap-3 justify-center items-center h-screen"
      // Exemplo: você pode utilizar a cor secundária da empresa para personalizar o fundo
      // style={{ backgroundColor: empresa.data.cor_secundaria }}
    >
      <div>
        <img src={empresa.data.logo} alt={empresa.data.nome} />
      </div>
      <FormComponent empresa={empresa.data} />
    </main>
  );
}
