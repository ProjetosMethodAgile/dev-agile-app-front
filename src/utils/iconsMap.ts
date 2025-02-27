import {
  Handshake,
  House,
  Search,
  Settings,
  User,
  Send,
  MonitorCog,
} from "lucide-react";

// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  "gerenciar-sistema": Settings,
  "help-desk": Handshake,
  "usuarios-do-sistema": User,
  "parametros-do-sistema": MonitorCog,
  search: Search,
  sendMessage: Send,

  //gerenciar usuarios
  "configurar-help-desk": Handshake,

  // Adicione outros mapeamentos conforme necessário
};

export default iconsMap;
