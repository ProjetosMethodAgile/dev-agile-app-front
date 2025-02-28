// app/[empresa]/login/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import getEmpresaByTag from "@/actions/getEmpresaByTag";
import { Form } from "@/components/form";
import { setLogin } from "@/actions/login";
import { KeyRound, Mail } from "lucide-react";
import VALIDA_EMPRESA_POR_ID from "@/actions/getEmpresaById";
import ToggleTheme from "@/components/ui/button/ToggleTheme";

export default async function EmpresaLoginPage({
  params,
}: {
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;

  // Busca os dados da empresa pela tag
  const empresa = await getEmpresaByTag(empresaTag);

  if (!empresa.ok || !empresa.data) {
    redirect("/asd");
  }
  const validaEmp = empresa.data.id;
  const statusEmp = await VALIDA_EMPRESA_POR_ID(validaEmp);

  const showOpenTicketButton = statusEmp === 200;

  // Se o usuário já estiver autenticado, redireciona para a área protegida
  const userResult = await getUser();
  if (userResult.ok && userResult.data) {
    redirect(`/${empresaTag}/protect/home`);
  }

  return (
    <main className="m-auto flex h-screen max-w-3xl items-center justify-center gap-10 max-lg:mx-6 max-lg:flex-col max-lg:items-center max-lg:gap-0 max-lg:px-2 max-sm:mx-2 max-sm:h-full max-sm:p-0 dark:text-white">
      <div className="animate-move-right-to-left mb-4 max-lg:mt-10">
        <h1 className="text-primary-300 mb-5 text-7xl font-bold max-xl:text-5xl max-lg:mb-4 max-sm:text-3xl">
          Bem&nbsp;vindo de volta
        </h1>
        <p className="text-primary-500/70 max-w-140 text-2xl max-xl:text-xl max-md:hidden dark:text-gray-300">
          Faça login para acessar as funcionalidades da plataforma.
        </p>
        <ToggleTheme />
      </div>
      <Form.Root action={setLogin} className="gap-8">
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
        <Form.InputSubmit name="action" value="entrar" type="submit">
          Entrar
        </Form.InputSubmit>
        {showOpenTicketButton && (
          <Form.InputSubmit
            name="action"
            value="openTicket"
            type="submit"
            className="text-primary-50 dark:text-primary-50 border-primary-300 dark:border-primary-50 border-1 bg-transparent dark:text-gray-300 dark:hover:border-transparent"
          >
            Abrir chamado
          </Form.InputSubmit>
        )}
      </Form.Root>
    </main>
  );
}
