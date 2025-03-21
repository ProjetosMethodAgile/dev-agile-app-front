// ChatController.ts
import getKanbanColunaBySetorId from "@/actions/getKanbanColunaBySetorId";
import getMotivoSetor from "@/actions/getMotivoSetor";
import { postCardHelpdesk } from "@/actions/HelpDesk/postCardHelpdesk";
import { MotivoHelpDesk, PostHelpdesk } from "@/types/api/apiTypes";
import React from "react";

export default class ChatController {
  /**
   * Trata a seleção do setor e atualiza a etapa.
   */
  async handleSectorSelection(
    setorId: string,
    setMotivo: (motivos: string[] | null) => void,
    setEtapaAtual: (etapa: number) => void,
    SetSetorHelpdesk: React.Dispatch<React.SetStateAction< string>>,
  ): Promise<void>{
    const response = await getMotivoSetor(setorId);
    if (Array.isArray(response.data)) {
      const motivos = response.data.map(
        (motivo: MotivoHelpDesk) => motivo.descricao,
      );

      setMotivo(motivos);
      SetSetorHelpdesk(setorId);
   
    }

    setEtapaAtual(2);
  }


  validateMessage(message: string): { valid: boolean; error?: string } {
    const trimmed = message.trim();
    if (!trimmed) {
      return { valid: false, error: "A mensagem não pode ser vazia." };
    }
    if (message.length < 50) {
      return {
        valid: false,
        error: `A descrição precisa ter no mínimo 50 caracteres, você só escreveu ${message.length} - por favor, tente novamente.`,
      };
    }
    if (message.length > 10000) {
      return {
        valid: false,
        error: `A descrição precisa ter no máximo 10.000 caracteres, você só escreveu ${message.length} - por favor, tente novamente.`,
      };
    }
    return { valid: true };
  }

  /**
   * Envia a mensagem do usuário e limpa o input.
   */
  sendUserMessage(
    text: string,
    sendMessage: (
      newMessage: string,
      type: "user" | "bot",
      loading?: boolean,
    ) => void,
    setMessageUser: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (!text.trim()) return;
    sendMessage(text, "user");
    setMessageUser("");
  }

  /**
   * Trata a ação de "voltar":
   * - Envia a mensagem de voltar;
   * - Limpa o input;
   * - Exibe a mensagem de loading;
   * - Ativa o contador de 5 segundos e, após esse tempo, reseta a interface.
   */
  async handleBackAction(
    sendMessage: (
      newMessage: string,
      type: "user" | "bot",
      loading?: boolean,
    ) => void,
    setMessageUser: React.Dispatch<React.SetStateAction<string>>,
    setCountdown: (value: number | null) => void,
    resetInterface: () => void,
  ): Promise<void> {
    sendMessage("voltar", "user");
    setMessageUser("");
    sendMessage("Escrevendo...", "bot", true);
    // Ativa o contador de 5 segundos
    setCountdown(5);
    // Após 5 segundos, reseta a interface
    setTimeout(() => {
      resetInterface();
    }, 5000);
  }
  async handleFinalize(
    setCountdown: (value: number | null) => void,
    setDataUserChamados: React.Dispatch<React.SetStateAction<string[]>>,
    dataUserChamados: string[],
    resetInterface: () => void,
  ): Promise<void> {
    setDataUserChamados(dataUserChamados);
    console.log(dataUserChamados);
    setCountdown(5);
    setTimeout(() => {
      resetInterface();
    }, 5000);
  }

  async pegaMotivo(setorIdSelecionado: string, nomeMotivo: string) {
    const response = await getMotivoSetor(setorIdSelecionado);
    if (Array.isArray(response.data)) {
      // Procura o motivo cujo atributo 'descricao' seja igual ao nome recebido
      const motivoEncontrado = response.data.find(
        (motivo: MotivoHelpDesk) => motivo.descricao === nomeMotivo
      );
      if (motivoEncontrado) {
        return motivoEncontrado;
      } else {
        console.log("Motivo não encontrado");
        return null;
      }
    }
  }
  
  

async postCardNoLogin({setor_id,
    src_img_capa,
    titulo_chamado,
    status,descricao}:PostHelpdesk) {
    const response = await postCardHelpdesk(
     { setor_id,
      src_img_capa,
      titulo_chamado,
      status,
      descricao}
    );



    return;
  }
}
