import getMotivoSetor from "@/actions/getMotivoSetor";
import { MotivoHelpDesk } from "@/types/api/apiTypes";
import React from "react";

export default class ChatController {
  async handleSectorSelection(
    setorId: string,
    setMotivo: (motivos: string[] | null) => void,
    setEtapaAtual: (etapa: number) => void,
    setSetorHelpdesk: React.Dispatch<React.SetStateAction<string>>,
  ): Promise<void> {
    const response = await getMotivoSetor(setorId);
    if (Array.isArray(response.data)) {
      const motivos = response.data.map(
        (motivo: MotivoHelpDesk) => motivo.descricao,
      );
      setMotivo(motivos);
      setSetorHelpdesk(setorId);
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
    setCountdown(5);
    setTimeout(() => {
      resetInterface();
    }, 5000);
  }
  async handleFinalize(
    setCountdown: (value: number | null) => void,
    setDataUserChamados: React.Dispatch<React.SetStateAction<string[]>>,
    dataUserChamados: string[],
    resetInterface: () => void,
    setEtapaAtual: (etapa: number) => void,
  ): Promise<void> {

    
    setDataUserChamados(dataUserChamados);
    setCountdown(5);
    setTimeout(() => {
    setEtapaAtual(0);
    resetInterface();
    }, 5000);
  }
  async pegaMotivo(setorIdSelecionado: string, nomeMotivo: string) {
    const response = await getMotivoSetor(setorIdSelecionado);
    if (Array.isArray(response.data)) {
      const motivoEncontrado = response.data.find(
        (motivo: MotivoHelpDesk) => motivo.descricao === nomeMotivo,
      );
      if (motivoEncontrado) {
        return motivoEncontrado;
      } else {
        console.log("Motivo não encontrado");
        return null;
      }
    }
  }


}
