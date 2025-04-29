//export const API_URL = "https://devagile.com.br/api";
export const API_URL = "http://localhost:3001/api";

export function GET_PERMISSIONS_ALL() {
  return {
    url: API_URL + "/permissoes",
  };
}

export function GET_PERMISSIONS_BY_ROLE_ID(id: string) {
  return {
    url: API_URL + `/permissoes/roles/${id}`,
  };
}

export function GET_ROLES_ALL() {
  return {
    url: API_URL + `/roles`,
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

export function POST_ATENDENTE_HELPDESK() {
  return {
    url: API_URL + "/helpdesk/atendentes/",
  };
}

export function GET_MOTIVO(setorId: string) {
  return {
    url: API_URL + `/kanban/motivos/setor/${setorId}`,
  };
}
export function POST_MOTIVO() {
  return {
    url: API_URL + `/kanban/motivos`,
  };
}

export function DELETE_MOTIVO(id: string) {
  return {
    url: API_URL + `/kanban/motivos/${id}`,
  };
}
export function PUT_MOTIVO(id: string) {
  return {
    url: API_URL + `/kanban/motivos/${id}`,
  };
}

export function GET_KANBAN_COLUNA(setor_id: string) {
  return {
    url: API_URL + `/helpdesk/columnsBySetor/${setor_id}`,
  };
}

export function GET_KANBAN_COLUNAS_BY_SETOR_EMP_ID(
  setor_id: string,
  emp_id: string,
) {
  return {
    url: API_URL + `/helpdesk/columns/setor/${setor_id}/empresa/${emp_id}`,
  };
}

export function GET_KANBAN_CARDS_BY_SETOR_ID(setor_id: string) {
  return {
    url: API_URL + `/helpdesk/cardsBySetor/${setor_id}`,
  };
}

export function GET_KANBAN_CARD_BY_ID(id: string) {
  return {
    url: API_URL + `/helpdesk/card/${id}`,
  };
}

export function POST_CHAMADO_KANBAN_COLUNA() {
  return {
    url: API_URL + `/helpdesk/card`,
  };
}

export function POST_AUTH_CHAMADO_KANBAN_COLUNA() {
  return {
    url: API_URL + `/helpdesk/card/auth`,
  };
}
export function POST_REPLY_CHAMADO_KANBAN() {
  return {
    url: API_URL + `/helpdesk/message/reply`,
  };
}

export function POST_CREATE_COLUMN_KANBAN() {
  return {
    url: API_URL + `/helpdesk/column`,
  };
}

export function POST_VINCULA_ATEND_CARD(sessao_id: string) {
  return {
    url: API_URL + `/helpdesk/atendente/card/${sessao_id}`,
  };
}

export function PUT_ORDEM_KANBAN_COLUNA() {
  return {
    url: API_URL + `/helpdesk/columnsBySetor`,
  };
}

export function PUT_CARD_COLUMN() {
  return {
    url: API_URL + `/helpdesk/card/updateColumn`,
  };
}
export function GET_ACOES_KANBAN(empresa_id: string) {
  return {
    url: API_URL + `/helpdesk/acoes/empresa/${empresa_id}`,
  };
}

export function GET_KEANBAN_ACOES_COLUNA(id: string) {
  return {
    url: API_URL + `/helpdesk/acoes/column/${id}`,
  };
}

export function POST_SEND_EMAIL_ACAO_KANBAN() {
  return {
    url: API_URL + `/helpdesk/acao/sendMail`,
  };
}

export function GET_SETOR_HELPDESK_FOR_USER(
  usuario_id: string,
  empresa_id: string,
) {
  return {
    url: API_URL + `/helpdesk/atendente/${usuario_id}/empresa/${empresa_id}`,
  };
}

export function GET_ALL_ATENDENTE_HELPDESK_BY_EMPRESA_ID(id: string) {
  return {
    url: API_URL + `/helpdesk/atendentes/empresa/${id}`,
  };
}

export function GET_USUARIOS_NAO_ATENDENTE_HELPDESK(id: string) {
  return {
    url: API_URL + `/helpdesk/atendentes/usuario/empresa/${id}`,
  };
}
export function DELETE_ATTENDENT_HELPDESK(id:string){
  return {
    url: API_URL + `/helpdesk/atendentes/${id}`
};
}
export function ATIVA_ATTENDENT_HELPDESK(id:string){
  return {
    url: API_URL + `/helpdesk/atendentes/ativo/${id}`
};
}
export function PEGA_TODOS_ATENDNETES(empresa_id:string){
  return {
    url: API_URL + `/helpdesk/atendentes/all/${empresa_id}`
};
}

//=================USUARIOS=====================================/

export function POST_USUARIO() {
  return {
    url: API_URL + "/usuario/register",
  };
}

export function GET_USER_ALL() {
  return {
    url: API_URL + `/usuarios`,
  };
}

export function GET_USERS_BY_EMP_ID(id: string) {
  return {
    url: API_URL + `/usuarios/empresa/${id}`,
  };
}

export function GET_USERS_EMP() {
  return {
    url: API_URL + `/usuarios`,
  };
}

export function GET_USER_ID(userId: string) {
  return {
    url: API_URL + `/usuario/${userId}`,
  };
}

export function PUT_USUARIO(userId: string) {
  return {
    url: API_URL + `/usuario/${userId}`,
  };
}

export function DELETE_USER_BY_ID(userID: string) {
  return {
    url: API_URL + `/usuario/${userID}`,
  };
}
