"use client";
import React from "react";
import { useUser } from "@/context/userContext";
import { validateUserPermissions } from "@/app/lib/validateUserPermissions";
import { redirect } from "next/navigation";

export default function NavComponent() {
  const { user, permissions } = useUser();
  const userId = user?.usuario.id;

  if (!permissions || !userId) redirect("/");

  // Verifica se o usuário possui acesso às ações desejadas na tela "Home"
  const podeAbrirModal = validateUserPermissions(
    permissions,
    "home",
    "abrir modal",
    userId,
  );
  const podeEnviarEmail = validateUserPermissions(
    permissions,
    "home",
    "enviar email",
    userId,
  );

  return (
    <nav className="flex gap-5">
      {podeAbrirModal && <button>abrir modal</button>}
      {podeEnviarEmail && <button>enviar email</button>}
    </nav>
  );
}
