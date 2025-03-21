// useHandleSendMessage.ts
import { useGlobalContext } from "@/context/globalContext";
import { fluxo } from "../Fluxo";
import { useEffect, useCallback, useState } from "react";
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
const [motivoselecionado,setMotivoselecionado] = useState("")
const [motivoMap,setMotivoMap] = useState({})
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
    setTitle(fluxo[etapaAtual].title);
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
      const setorNome = e.currentTarget.value;
  
      
      await chatController.handleSectorSelection(
        setorId,
        setMotivo,
        setEtapaAtual,
        SetSetorHelpdesk,
       
      );
      sendMessage(setorNome, "user")
      sendMessage(fluxo[2].pergunta, "bot")
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
      console.log(motivoMap);
      // const returnValue = await chatController.postCardNoLogin(setorHelpDesk,motivoImage,motivoID,"1",messageUser,motivoSelecionado);

      
      // await chatController.handleFinalize(
        //   setCountdown,
        //   setDataUserChamados,
        //   dataUserChamados,
        //   resetInterface,
        // );
        
        return;
      }
      
      
      if (etapaAtual === 2 && e) {
        const motivoEscolhido = e.currentTarget.value;
        setMotivoselecionado(motivoEscolhido);
        const motivoObject = await chatController.pegaMotivo(setorHelpDesk, motivoEscolhido);
        setMotivoMap(motivoObject);
        console.log(motivoObject);
        

        
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
