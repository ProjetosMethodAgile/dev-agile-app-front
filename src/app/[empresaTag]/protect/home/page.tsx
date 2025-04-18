// app/[empresa]/protect/home/page.tsx
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import NavComponent from "@/components/nav/nav";
import TestSocketButton from "@/components/TestSocketButton/TestSocketButton";

export default async function EmpresaHomePage() {
  await validateScreenAccess("Home");

  return (
    <main className="p-6">
      <h1>Tela Home</h1>
      <TestSocketButton />

      <NavComponent />
    </main>
  );
}
