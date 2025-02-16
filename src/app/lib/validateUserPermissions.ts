import { PermissaoCompletaData, UserAcaoTela } from "@/types/api/apiTypes";

export function validateUserPermissions(
  permissions: PermissaoCompletaData[],
  screenName: string,
  actionName: string,
  userId: string,
): boolean {
  if (!userId && !screenName && actionName && !permissions) return false;

  // Busca a permissão (tela) com base no nome informado
  const screen = permissions.find(
    (perm) =>
      perm.nome.trim().toLowerCase() === screenName.trim().toLowerCase(),
  );
  if (!screen) return false;

  // Verifica se na tela existe uma ação com o nome informado e se o usuário possui acesso a ela
  return screen.acoes.some(
    (acao) =>
      acao.nome.trim().toLowerCase() === actionName.trim().toLowerCase() &&
      acao.user_acoes?.some((ua: UserAcaoTela) => ua.usuario_id === userId),
  );
}
