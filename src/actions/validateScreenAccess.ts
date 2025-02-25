// app/actions/validateScreenAccess.ts
"use server";

import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import { PermissaoCompletaData } from "@/types/api/apiTypes";

export async function validateScreenAccess(screenName: string): Promise<void> {
  const normalizedScreen = screenName.trim().toLowerCase();

  const userResult = await getUser();
  if (!userResult.ok || !userResult.data) {
    redirect("/login");
  }
  const usuario = userResult.data.usuario;

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

  // Percorre as permissões de nível superior e, se necessário, suas subtelas
  for (const perm of usuario.permissoes) {
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
    redirect("/404");
  }
}
