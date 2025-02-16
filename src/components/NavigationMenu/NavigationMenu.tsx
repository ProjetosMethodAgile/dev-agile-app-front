"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { useUser } from "@/context/userContext";
import logout from "@/actions/logout";
import { usePathname } from "next/navigation";

import {
  AcaoTelaData,
  PermissaoCompletaData,
  UserAcaoTela,
} from "@/types/api/apiTypes";
import {
  House,
  Settings,
  PanelRightClose,
  UserRound,
  LogOut,
  Handshake,
} from "lucide-react";

// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  "gerenciar-sistema": Settings,
  "help-desk": Handshake,
  // Adicione outros mapeamentos conforme necessário
};

export default function NavigationMenu() {
  const { user, permissions } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname(); // Hook para obter a URL atual

  // Certifique-se de que a empresa está definida
  const empresaTag = user?.usuario.empresa?.[0]?.tag;
  if (!empresaTag) {
    return <div>Empresa não definida.</div>;
  }

  // Filtra as telas em que o usuário tem acesso.
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
              (ua: UserAcaoTela) => ua.usuario_id === user?.usuario.id,
            ),
        );
      return temPermissaoDireta || temAcaoComAcesso;
    },
  );

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className={`border-primary-600 h-screen ${
        isExpanded ? "w-40" : "w-20"
      } relative flex flex-col gap-2 overflow-hidden rounded-r-3xl border bg-black/20 backdrop-blur-2xl transition-all duration-300`}
    >
      {/* Seção superior: conteúdo do usuário */}
      <div
        id="user"
        className="m-4 flex min-h-20 flex-col items-center justify-center"
      >
        <UserRound className="bg-primary-500 size-10 rounded-2xl p-1" />
        {isExpanded && (
          <p className="mt-1 w-40 text-center">{user.usuario.nome}</p>
        )}
        <hr />
      </div>

      {/* Seção do meio: menu que ocupa o espaço disponível */}
      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {accessibleScreens?.map((screen: PermissaoCompletaData) => {
          const slug = screen.nome.trim().toLowerCase().replace(/\s+/g, "-");
          const href = `/${empresaTag}/protect/${slug}`;
          const IconComponent = iconsMap[slug] || House;
          const isActive = pathname === href; // Verifica se o link está ativo

          return (
            <li key={screen.id}>
              <Link
                href={href}
                className={`hover:bg-primary-500/30 flex items-center justify-center gap-2 rounded-md p-2 ${
                  isActive ? "bg-primary-500/30" : ""
                }`}
              >
                <div className="flex w-6 flex-shrink-0 justify-center">
                  <IconComponent className="size-6" />
                </div>
                {isExpanded && (
                  <span className="flex-1 transition-all duration-300">
                    {screen.nome}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Seção inferior: botão de toggle */}
      <div className="flex flex-col gap-2 overflow-y-auto p-2">
        <PanelRightClose
          className="hover:bg-primary-500/30 size-10 w-full cursor-pointer rounded-md p-1"
          onClick={toggleSidebar}
        />
        {/* Botão de logout */}
        <div onClick={() => logout(empresaTag)}>
          <LogOut className="size-10 w-full cursor-pointer rounded-md bg-red-500 p-1 hover:bg-red-800" />
        </div>
      </div>
    </nav>
  );
}
