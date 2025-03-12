// app/[empresa]/protect/home/page.tsx
import { validateScreenAccess } from "@/actions/validateScreenAccess";
import NavComponent from "@/components/nav/nav";

export default async function EmpresaHomePage() {
  await validateScreenAccess("Help Desk");

  return (
    <main className="p-6">
      <h1>Tela Home</h1>
      <NavComponent />

    </main>
  );
}
