// app/[empresa]/protect/home/page.tsx
import NavComponent from "@/components/nav/nav";
import ScreenValidator from "@/components/ScreenValidator/ScreenValidator";

export default function EmpresaHomePage() {
  return (
    <main className="p-6">
      {/* Valida se o usuário tem acesso à tela "Home" */}
      <ScreenValidator screenName="Help Desk" />
      <h1>Help Desk</h1>
    </main>
  );
}
