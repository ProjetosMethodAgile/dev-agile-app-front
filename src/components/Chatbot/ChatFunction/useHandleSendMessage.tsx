import { useGlobalContext } from "@/context/globalContext";
import { fluxo } from "../Fluxo";
import { useEffect, useCallback, useState } from "react";
import ChatController from "@/components/Chatbot/ChatFunction/Controller/GerenciaChat_Controller";
import { Chamado } from "@/components/ChatSuspenso/ActionChatSuspenso/Controller/Chamados";
import { ControllerChamados } from "@/components/ChatSuspenso/ActionChatSuspenso/Controller/ControllerChamados";

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
    motivoImage,
    setMotivoImage,
    setorHelpDesk,
    SetSetorHelpdesk,
    setMotivoselecionado,
    motivoselecionado,
    setNumChamado,
  } = useGlobalContext();
  const [motivoID, setMotivoID] = useState<string>("");
  const chatController = new ChatController();
  console.log(motivoID);

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

  const handleSendMessage = async (
    text: string = messageUser,
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // 1) Seleção do setor (etapaAtual === 1)
    if (etapaAtual === 1 && e) {
      const setorId = e.currentTarget.id;
      const setorNome = e.currentTarget.value;

      await chatController.handleSectorSelection(
        setorId,
        setMotivo,
        setEtapaAtual,
        SetSetorHelpdesk,
      );
      sendMessage(setorNome, "user");
      sendMessage(fluxo[etapaAtual].pergunta, "bot");
      return;
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

      const dia: number = new Date().getDate();
      const mes: number = new Date().getUTCMonth() + 1;
      const ano: number = new Date().getFullYear();
      const second: number = new Date().getSeconds();
      const serial: number = Math.random() * (90 - 1) + 1;

      numChamadoNow = `${dia}${mes}${ano}${second}-${Math.floor(serial)}`;
      setNumChamado(numChamadoNow);
      const motivoNome = dataUserChamados[0] || "";
      const descricao = dataUserChamados.slice(1).join(" ") || "";
      const status = "1";
      // await chatController.postCardNoLogin(
      //   setorHelpDesk, // ID do setor
      //   motivoImage ?? "", // URL da imagem vinda do GlobalContext
      //   `Chamado: Nº: ${numChamadoNow}\n${motivoNome}\n${motivoselecionado}`,
      //   status,
      //   descricao, // Descrição do chamado
      // );
      // console.log(motivoImage);
      const initTitle = `Chamado: Nº: ${numChamadoNow}\n${motivoNome}\n${motivoselecionado}`

 const chamado = new Chamado(
        setorHelpDesk,
        motivoImage ?? "",
        initTitle,
        descricao,
        status
      );
      
      const controllerChamados = new ControllerChamados();
      
      await controllerChamados.enviarChamado(
        chamado.getSetorID(),
        chamado.getSrcImgCapa(),
        chamado.getTitulo(),
        chamado.getDescricao(),
        chamado.getStatus()
      );


      
      sendMessage(
        fluxo[5].pergunta + ` esse é o Nº: ${numChamadoNow} do chamado`,
        "bot",
      );
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

    // 4) Seleção do motivo (etapaAtual === 2)
    if (etapaAtual === 2 && e) {
      const motivoEscolhido = e.currentTarget.value;
      setMotivoselecionado(motivoEscolhido);

      // Busca informações detalhadas do motivo
      const motivoObject = await chatController.pegaMotivo(
        setorHelpDesk,
        motivoEscolhido,
      );

      console.log("Objeto retornado de pegaMotivo:", motivoObject);
      if (motivoObject && typeof motivoObject === "object") {
        setMotivoImage(motivoObject.src_img); // Atualiza o GlobalContext
        setMotivoID(motivoObject.id);
      } else {
        console.error("Objeto inválido recebido:", motivoObject);
      }
    }

    // 5) Validação da descrição (etapaAtual === 3)
    if (etapaAtual === 3) {
      const validation = chatController.validateMessage(text);
      if (!validation.valid) {
        sendMessage(validation.error!, "bot");
        return;
      }
    }

    // Armazena a mensagem digitada pelo usuário
    setDataUserChamados((prev: string[]) => [...prev, text]);
    chatController.sendUserMessage(text, sendMessage, setMessageUser);

    const proximaEtapa = fluxo[etapaAtual].next(text);
    sendMessage("Escrevendo...", "bot", true);

    // Após um delay, atualiza a mensagem de "Escrevendo..." para a próxima pergunta ou finaliza
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
