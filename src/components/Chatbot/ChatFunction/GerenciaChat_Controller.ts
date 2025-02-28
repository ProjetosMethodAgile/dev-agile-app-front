// src/components/Chatbot/ChatFunction/GerenciaChat_Controller.ts
import getMotivoSetor from "@/actions/getMotivoSetor";

export default class GerenciaChat_Controller {
  /**
   * Trata o envio de mensagem para cenários específicos.
   * Caso a mensagem seja "Descrição", dispara a mensagem de "Escrevendo..." e reseta o input.
   */
  async enviaMensagem(
    sendMessage: (newMessage: string, type: "user" | "bot", loading?: boolean) => void,
    setMessageUser: React.Dispatch<React.SetStateAction<string>>,
    text: string
  ): Promise<void> {
    const messageToSend = text;
    if (!messageToSend.trim()) return;

    if (messageToSend === "Descrição") {
      // Envia a mensagem do usuário e dispara o loading do bot
      sendMessage(messageToSend, "user");
      setMessageUser("");
      sendMessage("Escrevendo...", "bot", true);
      // Neste cenário, a responsabilidade de resetar estados pode ficar no hook
    }
  }

  /**
   * Valida se a mensagem possui no mínimo 50 caracteres.
   */
  async validaMensagem(message: string): Promise<boolean> {
    return message.length >= 50 && message.trim() !== "";
  }

  /**
   * Busca o motivo do setor e atualiza o estado via callback.
   */
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
