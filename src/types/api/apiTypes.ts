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

export type PermissoesRole = {
  id: string;
  nome: string;
  descricao: string;
  parent_id: string;
};

export type PermissaoUserData = {
  permissao_id: string;
  acessos: PermissoesData;
  acoes: AcaoTelaData[];
};

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
  user_permissions_access?: PermissoesData[];
};

export type User = {
  id?: string;
  nome: string;
  email: string;
  contato: string;
  status: "Ativo" | "Inativo";
  empresa?: EmpresaData[];
  usuario_roles: RoleData[];
  primeiro_acesso?: boolean;
  permissoes: PermissaoCompletaData[];
  createdAt?: string;
  updatedAt?: string;
};

export type UsuariosData = {
  status: boolean;
  usuarios: User[];
};

// Tipo de usuário – conforme o endpoint "pegaUsuarioPorId"
// Agora o retorno agrupa as permissões em "permissoes"
export type UsuarioData = {
  status: boolean;
  usuario: User;
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

//_________________________HELPDESK____________________________

export type SetorHelpDesk = {
  id: string;
  empresa_id: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  Atendentes: {
    id: string;
    empresa_id: string;
    UsuarioAtendente: {
      nome: string;
    };
  }[];
};

export type MotivoHelpDesk = {
  id: string;
  setor_id: string;
  descricao: string;
  src_img: string;
  createdAt: string;
  updatedAt: string;
} & React.SetStateAction<string[] | null>;
export type KanbanColumn = {
  id: string;
  setor_id: string;
  nome: string;
  posicao: string;
  createdAt: string;
  updatedAt: string;
};
export type PostHelpdesk = {
  setor_id: string;
  src_img_capa: string;
  titulo_chamado: string;
  status: string;
  descricao: string;
};

export type GetKanbanColunaResponse = {
  columns: KanbanColumn[];
};

export type AtendentesHelpDesk = {
  id: string;
  usuario_id: string;
  empresa_id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  Setores: SetorHelpDesk[];
  UsuarioAtendente: {
    id: string;
    nome: string;
    email: string;
    contato: string;
    status: string;
  };
};

export type HelpDeskSetoresPorAtendente = {
  id: string;
  Setores: {
    id: string;
    nome: string;
    empresa_id: string;
  }[];
  UsuarioAtendente: {
    id: string;
    nome: string;
    email: string;
    contato: string;
  };
};

export type HelpDeskSetoresPorAtendenteAtivos = {
  id: string;
  status: boolean;
  Setores: {
    id: string;
    nome: string;
    empresa_id: string;
  }[];
  UsuarioAtendente: {
    id: string;
    nome: string;
    email: string;
    contato: string;
  };
};

export type usuariosDisponiveisHelpDesk = {
  usuario_id: string;
  empresa_id: string;
  createdAt: string;
  updatedAt: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    contato: string;
  };
};

export type ColumnsHelpDesk = KanbanColumn & {
  ColumnAcoes: {
    id: string;
    nome: string;
    descricao: string;
  }[];
};

export type AcaoColuna = {
  id: string;
  nome: string;
  descricao: string;
  createdAt: string;
  updateAt: string;
  permissao_id: string;
};

export type KanbanStatusCard = {
  id: string;
  nome: string;
  descricao?: string;
  color?: string; // hex ou nome de cor, ex: '#FF0000'
};

// Tipo de card resumido
export type CardHelpDesk = {
  id: string;
  column_id: string;
  src_img_capa: string;
  titulo_chamado: string;

  status_card_id: string;
  status: KanbanStatusCard;

  createdAt: string;
  updatedAt: string;

  ColumnsCard: KanbanColumn;
  CardSessao: {
    id: string;
    atendentesVinculados: {
      createdAt: string;
      UsuarioAtendente: {
        nome: string;
        email: string;
        contato: string;
      };
      KanbanSessoesAtendentes: {
        id: string;
        atenden: string;
        visuali: boolean;
      };
    }[];
  };

  messagesCount: number;
  attachmentsCount: number;
};

// Tipo de card com sessão completa
export type CardHelpDeskSessao = {
  id: string;
  column_id: string;
  src_img_capa: string;
  titulo_chamado: string;

  status_card_id: string;
  status: KanbanStatusCard;

  createdAt: string;
  updatedAt: string;

  ColumnsCard: { nome: string };
  CardSessao: {
    id: string;
    atendentesVinculados: {
      createdAt: string;
      UsuarioAtendente: {
        nome: string;
        email: string;
        contato: string;
      };
      KanbanSessoesAtendentes: {
        id: string;
        atenden: string;
        visuali: boolean;
      };
    }[];

    MessageSessao: {
      atendente_id: string;
      cliente_id: string;
      system_msg: boolean;
      content_msg: string;
      createdAt: string;
      updatedAt: string;
      message_id: string;
      from_email: string;
      to_email: string;
      cc_email: string;
      subject: string;
      in_reply_to: string;
      references_email: string;
      ClienteSessao: {
        nome: string;
        email: string;
      };
      AtendenteMessage: {
        id: string;
        UsuarioAtendente: {
          nome: string;
        };
      };
    }[];
  };
};

export type GetUserResult = GetUserSuccess | GetUserError;
