"use client";
// app/[empresa]/protected/home/page.tsx
import { useUser } from "@/context/userContext";
import LogoutButton from "@/components/logoutButton/logoutButton";

export default function EmpresaHomePage() {
  const { user } = useUser();

  return (
    <main className="p-6">
      <h1>Bem-vindo, {user?.usuario.nome}</h1>
      <LogoutButton />
    </main>
  );
}
