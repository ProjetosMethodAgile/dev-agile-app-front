"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { useUser } from "@/context/userContext";
import logout from "@/actions/logout";
import { usePathname } from "next/navigation";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { House, PanelRightClose, UserRound, LogOut } from "lucide-react";
import iconsMap from "@/utils/iconsMap";

export default function NavigationMenu() {
  const { user, permissions } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Verifica se a empresa está definida
  const empresaTag = user?.usuario.empresa?.[0]?.tag;
  if (!empresaTag) {
    return <div>Empresa não definida.</div>;
  }

  // Filtra apenas as permissões de nível superior (telas) – ignorando as subtelas (com parent_id)
  const accessibleScreens = permissions?.filter(
    (screen: PermissaoCompletaData) => !screen.parent_id,
  );

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className={`border-primary-600 fixed h-[100vh] py-1 ${
        isExpanded ? "w-50" : "w-20"
      } relative flex flex-col gap-2 overflow-hidden rounded-r-3xl border bg-black/20 backdrop-blur-2xl transition-all duration-300`}
    >
      {/* Seção superior: informações do usuário */}
      <div
        id="user"
        className="text-primary-900 dark:text-primary-50 flex min-h-20 flex-col items-center justify-center"
      >
        <UserRound className="bg-primary-500 text-primary-50 size-10 rounded-full p-2" />
        {isExpanded && (
          <p className="mt-1 w-40 text-center">{user.usuario.nome}</p>
        )}
        <hr />
      </div>

      {/* Menu principal: apenas telas */}
      <ul
        className={`${
          isExpanded ? "w-50" : "w-20"
        } flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto p-2`}
      >
        {accessibleScreens?.map((screen: PermissaoCompletaData) => {
          const slug = screen.nome.trim().toLowerCase().replace(/\s+/g, "-");
          const href = `/${empresaTag}/protect/${slug}`;
          const IconComponent = iconsMap[slug] || House;
          const isActive = pathname === href;

          return (
            <li key={screen.id}>
              <Link
                title={screen.nome}
                href={href}
                className={`dark:hover:bg-primary-500/30 hover:bg-primary-500/30 flex items-center justify-center gap-2 rounded-xl px-3 py-2 transition-all ${
                  isActive ? "bg-primary-500/30" : ""
                }`}
              >
                <div className="flex w-6 flex-shrink-0 justify-center">
                  <IconComponent className="text-primary-900 dark:text-primary-50 size-6" />
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

      {/* Seção inferior: toggle da sidebar e logout */}
      <div className="flex flex-col gap-2 overflow-y-auto p-2">
        <PanelRightClose
          className="hover:bg-primary-500/30 dark:text-primary-50 size-10 w-full cursor-pointer rounded-xl p-1 transition-all"
          onClick={toggleSidebar}
        />
        <div onClick={() => logout(empresaTag)}>
          <LogOut className="text-primary-50 size-10 w-full cursor-pointer rounded-xl bg-red-800 p-2 transition-all hover:bg-red-700" />
        </div>
      </div>
    </nav>
  );
}
