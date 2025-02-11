// app/[empresa]/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import FormComponent from "@/components/form/form";

export default async function EmpresaLoginPage(props: {
  params: { empresa: string };
}) {
  // Extraímos o parâmetro 'empresa' a partir de props.params
  const tag = props.params.empresa;

  // Busca os dados da empresa pelo tag
  const empresa = await getEmpresaByTag(tag);

  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  const { data: user, ok } = await getUser();
  if (ok && user) {
    redirect(`/${tag}/home`);
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
