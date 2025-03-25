import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useCallback, useState } from "react";
import ChatController from "@/components/Chatbot/ChatFunction/GerenciaChat_Controller";
import { FluxoChatSuspenso } from "./FluxoChatSuspenso";

type Message = {
  text: string;
  time: string;
  type: "user" | "bot";
  loading?: boolean;
};

export const viewChatSuspenso = () => {
  const {
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
    motivoImage,
    setMotivoImage,
    setorHelpDesk,
    SetSetorHelpdesk,
    setMotivoselecionado,
    motivoselecionado,
    setNumChamado,
    messagesLogado,
    setMessagesLogado,
  } = useGlobalContext();

  const [, setMotivoID] = useState<string>("");

  const chatController = new ChatController();
  

  // Função auxiliar para retornar o horário formatado
  const getFormattedTime = () =>
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, [countdown, setCountdown]);

  const sendMessage = useCallback(
    (newMessage: string, type: "user" | "bot", loading = false) => {
      setMessagesLogado((prev: Message[]) => [
        ...prev,
        {
          text: newMessage,
          time: getFormattedTime(),
          type,
          loading,
        },
      ]);
    },
    [setMessagesLogado],
  );

  const resetInterface = () => {
    // Atualiza a mensagem que está "carregando" para a primeira pergunta do fluxo
    setMessagesLogado((prev: Message[]) => {
      const updated = [...prev];
      const indexLoading = updated.findIndex((msg) => msg.loading);
      if (indexLoading !== -1) {
        updated[indexLoading] = {
          ...updated[indexLoading],
          text: FluxoChatSuspenso[0].pergunta,
          loading: false,
          time: getFormattedTime(),
        };
      }
      return updated;
    });
    setDataUserChamados([]);
    setEtapaAtual(0);
    setTitle(FluxoChatSuspenso[0].title);
    setSetorSelecionado(null);
  };
  const handleSendMessagechatSuspenso = async (
    text: string = messageUser,
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e?.preventDefault();
  
    // Na etapa 1, diferencie seleção do setor vs. seleção do motivo
    if (etapaAtual === 0 && e) {
      if (!setorSelecionado) {
        // Seleção do setor
        const setorId = e.currentTarget.id;
        const setorNome = e.currentTarget.value;
        console.log(setorNome);
        
  
        await chatController.handleSectorSelection(
          setorId,
          setMotivo,
          setEtapaAtual,
          SetSetorHelpdesk,
        );
        sendMessage(setorNome, "user");
        sendMessage(FluxoChatSuspenso[etapaAtual].pergunta, "bot");
        return;
      } else {
        // Seleção do motivo (quando o setor já foi selecionado)
        const motivoEscolhido = e.currentTarget.value;
        console.log("Motivo escolhido:", motivoEscolhido);
        setMotivoselecionado(motivoEscolhido);
  
        // Busca informações detalhadas do motivo
        const motivoObject = await chatController.pegaMotivo(
          setorHelpDesk,
          motivoEscolhido,
        );
  
        console.log("Objeto retornado de pegaMotivo:", motivoObject);
        if (motivoObject && typeof motivoObject === "object") {
          setMotivo(motivoObject); // Atualiza o motivo selecionado no contexto
          setMotivoImage(motivoObject.src_img);
          setMotivoID(motivoObject.id);
        } else {
          console.error("Objeto inválido recebido:", motivoObject);
        }
        return;
      }
    }
  
    // 2) Ação de "voltar"
    if (text === "voltar") {
      await chatController.handleBackAction(
        sendMessage,
        setMessageUser,
        setCountdown,
        resetInterface,
      );
      return;
    }
  
    // 3) Finalizar o chamado
    if (text === "Finalizar") {
      setEtapaAtual(5);
      let numChamadoNow: string = "";
  
      const dia = new Date().getDate();
      const mes = new Date().getUTCMonth() + 1;
      const ano = new Date().getFullYear();
      const second = new Date().getSeconds();
      const serial = Math.random() * (90 - 1) + 1;
  
      numChamadoNow = `${dia}${mes}${ano}${second}-${Math.floor(serial)}`;
      setNumChamado(numChamadoNow);
  
      const motivoNome = dataUserChamados[0] || "";
      const descricao = dataUserChamados.slice(1).join(" ") || "";
      const status = "1";
  
      await chatController.postCardNoLogin(
        setorHelpDesk,             // ID do setor
        motivoImage ?? "",         // URL da imagem do motivo
        `Chamado: Nº: ${numChamadoNow}\n${motivoNome}\n${motivoselecionado}`,
        status,
        descricao,                 // Descrição do chamado
      );
      sendMessage(
        `${FluxoChatSuspenso[5].pergunta} esse é o Nº: ${numChamadoNow} do chamado`,
        "bot",
      );
  
      // Executa a finalização após dois delays encadeados
      setTimeout(() => {
        setTimeout(() => {
          chatController.handleFinalize(
            setCountdown,
            setDataUserChamados,
            dataUserChamados,
            resetInterface,
          );
        }, 10000);
      }, 5000);
      return;
    }
  
    // 5) Validação da descrição (etapaAtual === 3)
    if (etapaAtual === 3) {
      const validation = chatController.validateMessage(text);
      if (!validation.valid) {
        sendMessage(validation.error!, "bot");
        return;
      }
    }
  
    // Armazena a mensagem digitada pelo usuário e envia a mensagem
    setDataUserChamados((prev: string[]) => [...prev, text]);
    chatController.sendUserMessage(text, sendMessage, setMessageUser);
  
    const proximaEtapa = FluxoChatSuspenso[etapaAtual].next(text);
    sendMessage("Escrevendo...", "bot", true);
  
    // Atualiza a mensagem "Escrevendo..." após um delay para a próxima pergunta ou finalização
    setTimeout(() => {
      setMessagesLogado((prev: Message[]) => {
        const updated = [...prev];
        const indexLoading = updated.findIndex((msg) => msg.loading);
        if (indexLoading !== -1) {
          updated[indexLoading] = {
            ...updated[indexLoading],
            text:
              proximaEtapa !== null
                ? FluxoChatSuspenso[proximaEtapa].pergunta
                : "Obrigado pelas informações!",
            loading: false,
            time: getFormattedTime(),
          };
        }
        return updated;
      });
  
      if (proximaEtapa !== null) {
        setEtapaAtual(proximaEtapa);
        setTitle(FluxoChatSuspenso[proximaEtapa].title);
      } else {
        setTitle("");
        const dadosChamado = {
          messages: messagesLogado, 
          setor: setorSelecionado,
          title,
          dataUserChamados,
        };
        setFormDataChamados(dadosChamado);
      }
    }, 1000);
  };
  

  return handleSendMessagechatSuspenso;
};
