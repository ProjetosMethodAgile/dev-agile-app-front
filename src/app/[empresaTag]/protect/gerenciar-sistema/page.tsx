// app/[empresa]/protect/home/page.tsx

import ScreenValidator from "@/components/ScreenValidator/ScreenValidator";

export default function EmpresaHomePage() {
  return (
    <main className="p-6">
      {/* Valida se o usuário tem acesso à tela "Gerenciar Sistema" */}
      <ScreenValidator screenName="Gerenciar Sistema" />
      <div className="dark:border-primary-600/70 border-primary-300 flex h-[90dvh] flex-wrap rounded-3xl border-2 bg-transparent p-5 backdrop-blur-2xl dark:border-1 dark:bg-black/20 dark:backdrop-blur-2xl">
        <h1>gerenciar</h1>
      </div>
    </main>
  );
}
