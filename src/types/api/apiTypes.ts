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

// Novo: Tipo para representar um tipo de permissão (ex: "CRUD", "Visualização")
export type TipoPermissaoData = {
  id: string;
  nome: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
};

// Para as permissões diretas (UserPermissionAccess)
export type PermissoesData = {
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
  user_acoes?: UserAcaoTela[]; // Registros de acesso (UserAcaoTela), se disponíveis
};

// 🔥 Novo: Tipo completo para uma Permissão (Tela), incluindo parent_id e tipo_permissao_id
export type PermissaoCompletaData = {
  id: string;
  nome: string;
  descricao: string;
  parent_id?: string | null; // Permissão pai (se houver)
  tipo_permissao_id?: string | null; // Tipo da permissão (CRUD, Visualização, etc.)
  createdAt: string;
  updatedAt: string;
  user_permissions_access: PermissoesData[];
  acoes: AcaoTelaData[];
  tipo_permissao?: TipoPermissaoData; // Relacionamento com o tipo de permissão
  subpermissoes?: PermissaoCompletaData[]; // 🔥 Novo: Lista de subtelas (hierarquia)
};

// Tipo de usuário – conforme o endpoint "pegaUsuarioPorId"
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
    acoesTela: string[]; // Array de IDs das ações unitárias
    permissoes_completas?: PermissaoCompletaData[];
    createdAt: string;
    updatedAt: string;
  };
};

// Tipo para fazer chamadas para API
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
  empresaToken: { id: string; tag: string };
};

export type GetUserError = {
  data: null;
  ok: false;
  error: string;
};

export type GetUserResult = GetUserSuccess | GetUserError;
