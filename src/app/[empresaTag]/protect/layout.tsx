// app/[empresa]/protect/layout.tsx
import { getUserPermissions } from "@/app/lib/getUserPermissions";
import { validateCompanySession } from "@/app/lib/validateCompanySession";
import { UserContextProvider } from "@/context/userContext";
import { GlobalContextProvider } from "@/context/globalContext";
import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
import { ChatSuspenso } from "@/components/ChatSuspenso/ChatSuspenso";
import { WebSocketProvider } from "@/context/WebSocketContext";
export default async function ProtectedEmpresaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ empresaTag: string }>;
}) {
  const { empresaTag } = await params;
  // Valida a sessão e obtém os dados do usuário
  const { user } = await validateCompanySession(empresaTag);
  // Obtém as permissões completas para o usuário logado
  let permissions;
  if (user.usuario.id) {
    permissions = await getUserPermissions(user.usuario.id, empresaTag);
  }
  return (
    <WebSocketProvider>
      <UserContextProvider user={user} permissions={permissions}>
        <GlobalContextProvider>
          <div className="flex h-dvh overflow-hidden">
            <header className="animate-move-right-to-left">
              <NavigationMenu />
            </header>
            <div className="absolute right-10 bottom-5 flex items-center justify-center">
              <ChatSuspenso />
            </div>
            <div className="h-[100vh] w-[100vw] overflow-auto">{children}</div>
          </div>
        </GlobalContextProvider>
      </UserContextProvider>
    </WebSocketProvider>
  );
}
