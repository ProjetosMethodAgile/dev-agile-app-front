// app/[empresa]/home/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import logout from "@/actions/logout";
import getEmpresaByTag from "@/actions/getEmpresaByTag";

export default async function EmpresaHomePage({
  params,
}: {
  params: { empresa: string };
}) {
  const tag = params.empresa;

  // Busca os dados da empresa
  const empresa = await getEmpresaByTag(tag);
  if (!empresa.ok || !empresa.data) {
    redirect("/404");
  }

  // Verifica se o usuário está autenticado
  const { data: user, ok } = await getUser();
  if (!ok || !user) {
    // Se não autenticado, redireciona de volta para o login da empresa
    redirect(`/${tag}`);
  }

  return (
    <main
      className="p-6"
      style={{ backgroundColor: empresa.data?.cor_primaria }}
    >
      <h1 style={{ color: empresa.data?.cor_secundaria }}>
        Bem-vindo, {user.usuario.nome}
      </h1>
      <form action={logout(tag)}>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </main>
  );
}
