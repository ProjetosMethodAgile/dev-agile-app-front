import { JwtPayload } from "jsonwebtoken";

// O token agora contém um objeto 'empresa' com id e tag
export type TokenData = JwtPayload & {
  id: string;
  empresa: {
    id: string;
    tag: string;
  };
};

export type Login = {
  message: string;
  token?: string;
  error: boolean;
};

export type EmpresaData = {
  id: string;
  nome: string;
  cnpj: string;
  tag: string;
  logo: string;
  cor_primaria: string;
  cor_secundaria: string;
};

export type RoleData = {
  id: string;
  nome: string;
  descricao: string;
};

// Para as permissões diretas (UserPermissionAccess)
export type PermissoesData = {
  // Pode ser usado tanto para o registro de acesso quanto para definir a estrutura de cada permissão
  permissao_id?: string;
  id?: string;
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
};

// Caso precise agrupar as permissões por tela (como na consulta "pegaUsuarioPorId")
export type PermissoesUserData = {
  tela: string;
  permissoes: PermissoesData[];
};

export type UserAcaoTela = {
  id: number;
  acao_tela_id: string;
  usuario_id: string;
  createdAt: string;
  updatedAt: string;
};

// Tipo para a ação unitária (AcaoTela)
export type AcaoTelaData = {
  id: string;
  nome: string;
  descricao: string;
  // Retorna os registros de acesso (UserAcaoTela) se disponíveis
  user_acoes?: UserAcaoTela[];
};

// Novo: Tipo completo para uma Permissão (Tela) retornada pelo endpoint,
// incluindo a lista de acessos (UserPermissionAccess) e as ações (AcaoTela)
export type PermissaoCompletaData = {
  id: string;
  nome: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
  user_permissions_access: PermissoesData[];
  acoes: AcaoTelaData[];
};

// Tipo de usuário – conforme o endpoint "pegaUsuarioPorId" (separado da consulta de permissões completas)
export type UsuarioData = {
  status: boolean;
  usuario: {
    id: string;
    nome: string;
    email: string;
    contato: string;
    empresa: EmpresaData[];
    usuario_roles: RoleData[];
    usuario_permissoes_por_tela: PermissoesUserData[];
    acoesTela: string[]; // array de IDs das ações unitárias (quando usado no endpoint de usuário)
    createdAt: string;
    updatedAt: string;
  };
};

export type PropsApiReturn = {
  url: string;
  options?: {
    method: string;
    headers?: {
      Accept?: string;
      Authorization?: string;
      "Content-Type"?: string;
    };
    body?: string | Record<string, unknown>;
  };
};

// Tipos para o retorno da função getUser
export type GetUserSuccess = {
  data: UsuarioData;
  ok: true;
  empresaToken: { id: string; tag: string }; // Objeto com o ID e a tag da empresa contidos no token
};

export type GetUserError = {
  data: null;
  ok: false;
  error: string;
};

export type GetUserResult = GetUserSuccess | GetUserError;
