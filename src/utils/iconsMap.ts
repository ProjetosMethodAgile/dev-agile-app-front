
import { Atom, Handshake, House, Search, Settings, User, Send } from "lucide-react";


// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  "gerenciar-sistema": Settings,
  "help-desk": Handshake,
  usuarios: User,
  "parametros-do-sistema": Atom,
  search: Search,
  sendMessage:Send
  
  //gerenciar usuarios
  "configurar-help-desk": Handshake,

  // Adicione outros mapeamentos conforme necessário
};

export default iconsMap;
