// app/[empresa]/protect/home/page.tsx

import LogoutButton from "@/components/logoutButton/logoutButton";
import NavComponent from "@/components/nav/nav";
import ScreenValidator from "@/components/ScreenValidator/ScreenValidator";

export default function EmpresaHomePage() {
  return (
    <main className="p-6">
      {/* Valida se o usuário tem acesso à tela "Home" */}
      <ScreenValidator screenName="Gerenciar Sistema" />
      <h1>Tela Gerenciar</h1>
      <NavComponent />

      <LogoutButton />
    </main>
  );
}
