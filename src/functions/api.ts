export const API_URL = "https://devagile.com.br/api";
// export const API_URL = "http://localhost3001/api";

export function GET_PERMISSIONS_ALL() {
  return {
    url: API_URL + "/permissoes",
  };
}

export function GET_USER_ALL() {
  return {
    url: API_URL + `/usuarios`,
  };
}

export function GET_ROLES_ALL() {
  return {
    url: API_URL + `/roles`,
  };
}

export function GET_USER_ID(userId: string) {
  return {
    url: API_URL + `/usuario/${userId}`,
  };
}

export function POST_LOGIN() {
  return {
    url: API_URL + `/usuario/login`,
  };
}

export function GET_EMPRESA_TAG(tag: string) {
  return {
    url: API_URL + `/empresas/tag/${tag}`,
  };
}

export function GET_PERMISSOES_ACOES_USER(tag: string) {
  return {
    url: API_URL + `/permissoes/user/${tag}`,
  };
}

export function GET_VERIFYPARAMETROS_EMPRESA(empresaId: string) {
  return {
    url: API_URL + `/parametros/verifica/${empresaId}`,
  };
}

//=================HELP-DESK=====================================/

export function GET_SETOR_HELPDESK_BY_EMPRESA_ID(id: string) {
  return {
    url: API_URL + `/helpdesk/setores/empresa/${id}`,
  };
}

export function POST_SETOR_HELPDESK() {
  return {
    url: API_URL + "/helpdesk/setores",
  };
}

export function GET_MOTIVO(setorId: string) {
  return {
    url: API_URL + `/kanban/motivos/setor/${setorId}`,
  };
}

//=================USUARIOS=====================================/

export function POST_USUARIO() {
  return {
    url: API_URL + "/usuario/register",
  };
}
