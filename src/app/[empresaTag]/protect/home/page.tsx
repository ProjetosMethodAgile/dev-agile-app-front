// app/[empresa]/protect/home/page.tsx
import NavComponent from "@/components/nav/nav";
import ScreenValidator from "@/components/ScreenValidator/ScreenValidator";

export default function EmpresaHomePage() {
  return (
    <main className="p-6">
      {/* Valida se o usuário tem acesso à tela "Home" */}
      <ScreenValidator screenName="Home" />
      <h1>Tela Home</h1>

      <NavComponent />
    </main>
  );
}
