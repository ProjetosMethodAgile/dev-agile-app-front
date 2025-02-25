"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import logout from "@/actions/logout";
import { PermissaoCompletaData } from "@/types/api/apiTypes";

type ScreenValidatorProps = {
  screenName: string;
};

export default function ScreenValidator({ screenName }: ScreenValidatorProps) {
  const { user, permissions } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !permissions) return;

    const normalizedScreen = screenName.trim().toLowerCase();
    console.log("Validando acesso para:", normalizedScreen);
    console.log("Permissões disponíveis:", permissions);

    // Função recursiva para buscar acesso em telas e subtelas
    const checkAccess = (permission: PermissaoCompletaData): boolean => {
      if (!permission) return false;

      // Verifica acesso explícito via user_permissions_access
      if (
        permission.user_permissions_access &&
        permission.user_permissions_access.length > 0
      ) {
        return true;
      }

      // Verifica se há alguma ação com registros no array de ações
      if (permission.acoes && permission.acoes.length > 0) {
        for (const acao of permission.acoes) {
          if (acao.user_acoes && acao.user_acoes.length > 0) {
            return true;
          }
        }
      }

      // Verifica se há acesso a alguma subtela
      if (permission.subpermissoes && permission.subpermissoes.length > 0) {
        for (const subpermissao of permission.subpermissoes) {
          if (checkAccess(subpermissao)) {
            return true;
          }
        }
      }

      return false;
    };

    // Encontra a tela principal ou qualquer subtela correspondente
    let hasAccess = false;
    for (const perm of permissions) {
      if (perm.nome.trim().toLowerCase() === normalizedScreen) {
        hasAccess = checkAccess(perm);
        break;
      }

      // Se não encontrou a tela diretamente, procura nas subtelas
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
      // Se o usuário não tem acesso, executa o logout e redireciona
      console.log("Acesso negado. Deslogando...");
      logout(user.usuario.empresa?.[0]?.tag);
    }
  }, [user, permissions, screenName, router]);

  return null;
}
