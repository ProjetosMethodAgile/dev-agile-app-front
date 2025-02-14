"use client";
import React from "react";
import { useUser } from "@/context/userContext";
import { UserAcaoTela } from "@/types/api/apiTypes";

export default function NavComponent() {
  const { user, permissions } = useUser();
  const userId = user?.usuario.id;

  // Procura a permissão referente à tela "Home"
  const homePermission = permissions?.find(
    (perm) => perm.nome.trim().toLowerCase() === "home"
  );

  // Verifica se, dentro da tela Home, existe a ação "abrir modal" com acesso para o usuário
  const podeAbrirModal = homePermission?.acoes.some(
    (acao) =>
      acao.nome.trim().toLowerCase() === "abrir modal" &&
      acao.user_acoes?.some((ua: UserAcaoTela) => ua.usuario_id === userId)
  );

  // Verifica se, dentro da tela Home, existe a ação "enviar email" com acesso para o usuário
  const podeEnviarEmail = homePermission?.acoes.some(
    (acao) =>
      acao.nome.trim().toLowerCase() === "enviar email" &&
      acao.user_acoes?.some((ua: UserAcaoTela) => ua.usuario_id === userId)
  );

  return (
    <nav className="flex gap-5">
      <span>{user?.usuario.nome}</span>
      {podeAbrirModal && <button>abrir modal</button>}
      {podeEnviarEmail && <button>enviar email</button>}
    </nav>
  );
}
