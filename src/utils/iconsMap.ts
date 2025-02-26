import { Atom, Handshake, House, Settings, User,Send  } from "lucide-react";

// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  "gerenciar-sistema": Settings,
  "help-desk": Handshake,
  usuarios: User,
  "parametros-do-sistema": Atom,
  sendMessage:Send
  // Adicione outros mapeamentos conforme necessário
};

export default iconsMap;
