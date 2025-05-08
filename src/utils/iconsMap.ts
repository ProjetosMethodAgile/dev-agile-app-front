import {
  Handshake,
  House,
  Search,
  Settings,
  User,
  Send,
  MonitorCog,
  Pencil,
  Trash2,
  Plus,
  CircleChevronLeft,
  CircleX,
  Paperclip,
  UserRoundPlus,
  ChartColumnBig,
} from "lucide-react";

// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  "gerenciar-sistema": Settings,
  settings: Settings,
  CircleX: CircleX,
  "help-desk": Handshake,
  "usuarios-do-sistema": User,
  users: User,
  "parametros-do-sistema": MonitorCog,
  search: Search,
  sendMessage: Send,
  editBtn: Pencil,
  delete: Trash2,
  add: Plus,
  voltar: CircleChevronLeft,
  //gerenciar usuarios
  "configurar-help-desk": Handshake,
  Paperclip: Paperclip,
  UserRoundPlus: UserRoundPlus,
  Dash: ChartColumnBig,

  // Adicione outros mapeamentos conforme necessário
};

export default iconsMap;
