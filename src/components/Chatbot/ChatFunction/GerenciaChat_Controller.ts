import getMotivoSetor from "@/actions/getMotivoSetor";
type Message = {
    text: string;
    time: string;
    type: "user" | "bot";
    loading?: boolean;
  };

export default class GerenciaChat_Controller {
    async enviaMensagem(sendMessage: (newMessage: string, type: "user" | "bot", loading?: boolean) => void , setMessageUser:React.Dispatch<React.SetStateAction<string>> ): Promise<void> {
        const messageToSend = text;
        if (!messageToSend.trim()) return;
        if (messageToSend === "Descrição") {
    
          sendMessage(messageToSend, "user");
          setMessageUser("");
          sendMessage("Escrevendo...", "bot", true);
    
      }
    }
  
    async validaMensagem(message: string): Promise<boolean> {
      if (message.length < 50 || message.trim() === "") {
        return false;
      } else {
        return true;
      }
    }

    async pegaMotivoPorID(
        setorMotivo: string,
        setMotivo: (motivos: string[] | null) => void
      ): Promise<void> {
        const response = await getMotivoSetor(setorMotivo);
        if (Array.isArray(response.data)) {
          const motivoPorSetor = response.data.map((motivo) => motivo.descricao);
          setMotivo(motivoPorSetor);
        }
      }
  
    
  }
  