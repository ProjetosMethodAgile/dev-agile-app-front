// app/[empresa]/protect/layout.tsx
import { getUserPermissions } from "@/app/lib/getUserPermissions";
import { validateCompanySession } from "@/app/lib/validateCompanySession";
import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
import { UserContextProvider } from "@/context/userContext";

export default async function ProtectedEmpresaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;
  // Valida a sessão e obtém os dados do usuário (incluindo o token se necessário)
  const { user } = await validateCompanySession(empresaTag);
  // Obtém as permissões completas para o usuário logado
  const permissions = await getUserPermissions(user.usuario.id, empresaTag);

  return (
    <UserContextProvider user={user} permissions={permissions}>
      <header>
        <NavigationMenu />
      </header>
      {children}
    </UserContextProvider>
  );
}
