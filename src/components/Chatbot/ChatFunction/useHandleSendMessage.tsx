// useHandleSendMessage.ts
import { useGlobalContext } from "@/context/globalContext";
import { fluxo } from "../Fluxo";
import { useEffect, useCallback } from "react";
import ChatController from "@/components/Chatbot/ChatFunction/GerenciaChat_Controller";

type Message = {
  text: string;
  time: string;
  type: "user" | "bot";
  loading?: boolean;
};

export const useHandleSendMessage = () => {
  const {
    messages,
    setMessages,
    etapaAtual,
    setEtapaAtual,
    setorSelecionado,
    setSetorSelecionado,
    messageUser,
    setMessageUser,
    title,
    setTitle,
    dataUserChamados,
    setDataUserChamados,
    setFormDataChamados,
    countdown,
    setCountdown,
    setMotivo,
    setorHelpDesk,
    SetSetorHelpdesk,
  } = useGlobalContext();

  const chatController = new ChatController();

  // Contador regressivo (mantido conforme lógica existente)
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, [countdown, setCountdown]);

  // Função para adicionar mensagens
  const sendMessage = useCallback(
    (newMessage: string, type: "user" | "bot", loading = false) => {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: newMessage,
          time: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          type,
          loading,
        },
      ]);
    },
    [setMessages],
  );

  // Função para resetar a interface
  const resetInterface = () => {
    setMessages((prev: Message[]) => {
      const updated = [...prev];
      const indexLoading = updated.findIndex((msg) => msg.loading);
      if (indexLoading !== -1) {
        updated[indexLoading] = {
          ...updated[indexLoading],
          text: fluxo[0].pergunta,
          loading: false,
          time: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
      }
      return updated;
    });
    setDataUserChamados([]);
    setEtapaAtual(0);
    setTitle(fluxo[0].title);
    setSetorSelecionado(null);
  };

  /**
   * Função principal para tratar o envio de mensagens.
   */
  const handleSendMessage = async (
    text: string = messageUser,
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (etapaAtual === 1 && e) {
      const setorId = e.currentTarget.id;
      await chatController.handleSectorSelection(
        setorId,
        setMotivo,
        setEtapaAtual,
        SetSetorHelpdesk,
      );
      return;
    }

    // Ação de voltar: inicia o countdown de 5 segundos e reseta a interface após esse tempo
    if (text === "voltar") {
      await chatController.handleBackAction(
        sendMessage,
        setMessageUser,
        setCountdown,
        resetInterface,
      );
      return;
    }
    if (text === "Finalizar") {
      const returnValue = await chatController.buscaColunaKanbam(setorHelpDesk);
      const idKanbanInitial = returnValue.id;
      console.log(idKanbanInitial);

      await chatController.handleFinalize(
        setCountdown,
        setDataUserChamados,
        dataUserChamados,
        resetInterface,
      );

      return;
    }

    if (etapaAtual === 3) {
      const validation = chatController.validateMessage(text);
      if (!validation.valid) {
        sendMessage(validation.error!, "bot");
        return;
      }
    }

    // Processa e envia a mensagem do usuário
    setDataUserChamados((prev: string[]) => [...prev, text]);
    chatController.sendUserMessage(text, sendMessage, setMessageUser);

    const proximaEtapa = fluxo[etapaAtual].next(text);
    sendMessage("Escrevendo...", "bot", true);

    setTimeout(() => {
      setMessages((prev: Message[]) => {
        const updated = [...prev];
        const indexLoading = updated.findIndex((msg) => msg.loading);
        if (indexLoading !== -1) {
          updated[indexLoading] = {
            ...updated[indexLoading],
            text:
              proximaEtapa !== null
                ? fluxo[proximaEtapa].pergunta
                : "Obrigado pelas informações!",
            loading: false,
            time: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };
        }
        return updated;
      });

      if (proximaEtapa !== null) {
        setEtapaAtual(proximaEtapa);
        setTitle(fluxo[proximaEtapa].title);
      } else {
        setTitle("");
        const dadosChamado = {
          messages,
          setor: setorSelecionado,
          title,
          dataUserChamados,
        };
        setFormDataChamados(dadosChamado);
        setCountdown(5);
      }
    }, 1000);
  };

  return handleSendMessage;
};
