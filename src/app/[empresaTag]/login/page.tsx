// app/[empresa]/login/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import { Form } from "@/components/form";
import { setLogin } from "@/actions/login";
import { KeyRound, Mail } from "lucide-react";

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
    <main className="mx-60 flex h-dvh gap-10 max-lg:mx-6 max-lg:flex-col max-lg:items-center max-lg:gap-0 max-lg:px-2 max-sm:mx-2 max-sm:h-full max-sm:p-0 dark:text-white">
      <div className="animate-move-right-to-left mt-28 max-lg:mt-10">
        <h1 className="text-title mb-5 text-7xl font-bold max-xl:text-5xl max-lg:mb-4 max-sm:text-3xl">
          Bem&nbsp;vindo de volta
        </h1>
        <p className="max-w-140 text-3xl text-gray-200 max-xl:text-xl max-lg:hidden">
          Faça login para acessar as funcionalidades da plataforma.
        </p>
      </div>
      <Form.Root action={setLogin}>
        <input type="hidden" name="empresaTag" value={empresa.data.tag} />
        <input type="hidden" name="empresaId" value={empresa.data.id} />

        <Form.Logo src={empresa.data.logo} alt={empresa.data.nome} />
        <Form.InputText
          icon={Mail}
          id="email"
          placeholder="email"
          name="email"
        />
        <Form.InputText
          icon={KeyRound}
          id="senha"
          placeholder="senha"
          type="password"
          name="senha"
        />
        <div className="mb-2 flex items-center justify-between">
          <Form.Remember />
          <Form.ForgetPassword />
        </div>
        <Form.InputSubmit />
      </Form.Root>
    </main>
  );
}
