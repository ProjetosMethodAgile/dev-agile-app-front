// app/[empresa]/protected/layout.tsx
import { validateCompanySession } from "@/app/lib/validateCompanySession";
import { UserContextProvider } from "@/context/userContext";

export default async function ProtectedEmpresaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ empresaTag: string }>;
}) {
  // Executa a validação: se algo estiver errado, a função redireciona.
  const { empresaTag } = await params;
  const { user } = await validateCompanySession(empresaTag);

  // Se a validação passar, injeta o contexto do usuário e renderiza os filhos.
  return <UserContextProvider user={user}>{children}</UserContextProvider>;
}
