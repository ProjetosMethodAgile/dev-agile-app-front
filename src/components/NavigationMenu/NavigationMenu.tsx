"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@/context/userContext";
import {
  AcaoTelaData,
  PermissaoCompletaData,
  UserAcaoTela,
} from "@/types/api/apiTypes";

export default function NavigationMenu() {
  const { user, permissions } = useUser();

  // Certifique-se de que a empresa está definida
  const empresaTag = user?.usuario.empresa?.[0]?.tag;

  if (!empresaTag) {
    return <div>Empresa não definida.</div>;
  }

  // Filtra as telas em que o usuário tem acesso.
  // Considera que o usuário tem acesso se houver registros em user_permissions_access
  // ou se alguma ação (dentro de acoes) tiver registros em user_acoes do usuário.
  const accessibleScreens = permissions?.filter(
    (screen: PermissaoCompletaData) => {
      const temPermissaoDireta =
        screen.user_permissions_access &&
        screen.user_permissions_access.length > 0;
      const temAcaoComAcesso =
        screen.acoes &&
        screen.acoes.some(
          (acao: AcaoTelaData) =>
            acao.user_acoes &&
            acao.user_acoes.some(
              (ua: UserAcaoTela) => ua.usuario_id === user?.usuario.id
            )
        );
      return temPermissaoDireta || temAcaoComAcesso;
    }
  );

  return (
    <nav className="bg-gray-100 p-4">
      <ul className="flex gap-4">
        {accessibleScreens?.map((screen: PermissaoCompletaData) => {
          // Cria um slug a partir do nome da tela
          const slug = screen.nome.trim().toLowerCase().replace(/\s+/g, "-");
          // Monta a rota: /[empresaTag]/protected/[slug]
          const href = `/${empresaTag}/protect/${slug}`;

          return (
            <li key={screen.id}>
              <Link href={href} className="text-blue-600 hover:underline">
                {screen.nome}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
