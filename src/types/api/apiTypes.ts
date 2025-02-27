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

// Tipo para representar um tipo de permissão (ex: "CRUD", "Visualização")
export type TipoPermissaoData = {
  id: string;
  nome: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
};

// Para os acessos CRUD de uma permissão
export type PermissoesData = {
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
};

// Tipo para a ação unitária (AcaoTela)
export type AcaoTelaData = {
  id: string;
  nome: string;
  descricao: string;
  // Caso seja necessário armazenar os registros de acesso, pode ser opcional:
  user_acoes?: UserAcaoTela[];
};

export type UserAcaoTela = {
  id: number;
  acao_tela_id: string;
  usuario_id: string;
  createdAt: string;
  updatedAt: string;
};

// 🔥 Novo: Tipo completo para uma Permissão (Tela ou Subtela)
// Cada permissão possui os acessos (CRUD), suas ações e, opcionalmente, subtelas (subpermissoes)
export type PermissaoCompletaData = {
  id: string;
  nome: string;
  descricao: string;
  // A propriedade "acessos" representa os flags CRUD para essa permissão
  acessos: PermissoesData;
  // Ações vinculadas à permissão
  acoes: AcaoTelaData[];
  // Hierarquia: subtelas associadas
  subpermissoes?: PermissaoCompletaData[];
  // Caso necessário, os campos de relacionamento também podem ser mantidos como opcionais:
  parent_id?: string | null;
  tipo_permissao_id?: string | null;
  tipo_permissao?: TipoPermissaoData;
  createdAt?: string;
  updatedAt?: string;
};

// Tipo de usuário – conforme o endpoint "pegaUsuarioPorId"
// Agora o retorno agrupa as permissões em "permissoes"
export type UsuarioData = {
  status: boolean;
  usuario: {
    id: string;
    nome: string;
    email: string;
    contato: string;
    empresa: EmpresaData[];
    usuario_roles: RoleData[];
    // As permissões agora vêm agrupadas e completas (com acessos, ações e subtelas)
    permissoes: PermissaoCompletaData[];
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

export type SetorHelpDesk ={
  id: string,
  empresa_id: string,
  nome: string,

}
export type MotivoHelpDesk ={
  
    id: string,
    setor_id: string,
    descricao: string,
    src_img: string,

}

export type GetUserResult = GetUserSuccess | GetUserError;
