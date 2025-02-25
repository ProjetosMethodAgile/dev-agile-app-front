"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { PermissaoCompletaData } from "@/types/api/apiTypes";

type ScreenValidatorProps = {
  screenName: string;
};

export default function ScreenValidator({ screenName }: ScreenValidatorProps) {
  const { user, permissions } = useUser();

  useEffect(() => {
    if (!user || !permissions) return;

    const normalizedScreen = screenName.trim().toLowerCase();
    console.log("Validando acesso para:", normalizedScreen);
    console.log("Permissões disponíveis:", permissions);

    // Função recursiva para verificar se uma permissão (ou alguma de suas subtelas) concede acesso
    const checkAccess = (permission: PermissaoCompletaData): boolean => {
      const { acessos, acoes, subpermissoes } = permission;
      // Verifica se a permissão possui algum flag CRUD verdadeiro
      const hasCRUDAccess =
        acessos &&
        (acessos.can_create ||
          acessos.can_read ||
          acessos.can_update ||
          acessos.can_delete);
      // Verifica se há alguma ação vinculada
      const hasAcaoAccess = acoes && acoes.length > 0;
      if (hasCRUDAccess || hasAcaoAccess) return true;

      // Se não, verifica recursivamente nas subtelas
      if (subpermissoes && subpermissoes.length > 0) {
        return subpermissoes.some((sub) => checkAccess(sub));
      }
      return false;
    };

    let hasAccess = false;

    // Procura a tela (ou subtela) que corresponda ao nome informado
    for (const perm of permissions) {
      if (perm.nome.trim().toLowerCase() === normalizedScreen) {
        hasAccess = checkAccess(perm);
        break;
      }
      if (perm.subpermissoes && perm.subpermissoes.length > 0) {
        for (const subperm of perm.subpermissoes) {
          if (subperm.nome.trim().toLowerCase() === normalizedScreen) {
            hasAccess = checkAccess(subperm);
            break;
          }
        }
      }
      if (hasAccess) break;
    }

    if (!hasAccess) {
      console.log("Acesso negado....");
      redirect("/home");
    }
  }, [user, permissions, screenName]);

  return null;
}
