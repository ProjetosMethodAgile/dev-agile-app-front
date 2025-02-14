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
    console.log(normalizedScreen);
    console.log(permissions);

    // Encontra a tela ("Home") no array de permissões
    const screenPerm = permissions.find(
      (perm: PermissaoCompletaData) =>
        perm.nome.trim().toLowerCase() === normalizedScreen
    );

    // Se a tela não for encontrada ou se não houver registros de acesso, desloga
    let hasAccess = false;
    if (screenPerm) {
      // Se houver acesso explícito via user_permissions_access, temos acesso
      if (
        screenPerm.user_permissions_access &&
        screenPerm.user_permissions_access.length > 0
      ) {
        hasAccess = true;
      }
      // Ou, se houver alguma ação com registro (user_acoes) no array de ações
      else if (screenPerm.acoes && screenPerm.acoes.length > 0) {
        for (const acao of screenPerm.acoes) {
          if (acao.user_acoes && acao.user_acoes.length > 0) {
            hasAccess = true;
            break;
          }
        }
      }
    }

    if (!hasAccess) {
      // Se o usuário não tem acesso, executa o logout e redireciona
      logout(user.usuario.empresa?.[0]?.tag);
    }
  }, [user, permissions, screenName, router]);

  return null;
}
