import { JwtPayload } from "jsonwebtoken";

export type TokenData = JwtPayload & { id: string };

export type Login = {
  message: string;
  token?: string;
  error: boolean;
};

export type EmpresaData = {
  id: string;
  nome: string;
  cnpj: string;
};

export type RoleData = {
  id: string;
  nome: string;
  descricao: string;
};

export type PermissoesData = {
  permissao_id?: string;
  id?: string;
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
};

export type PermissoesUserData = {
  tela: string;
  permissoes: PermissoesData[];
};

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
    body?: string | Record<string, unknown>; // Tipo para o corpo da requisição
  };
};
