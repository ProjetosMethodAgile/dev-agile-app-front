"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useEffect, useMemo, useCallback } from "react";
import ChatController from "@/components/Chatbot/ChatFunction/Controller/GerenciaChat_Controller";
import { FluxoChatSuspenso } from "./FluxoChatSuspenso";
import { Chamado } from "./Controller/Chamados";
import { ControllerChamados } from "./Controller/ControllerChamados";
import { ChamadoLogin } from "./Controller/ChamadosLogin";
import { MensagemController } from "./Controller/MensagemController"; // importe a classe refatorada

export const useViewChatSuspenso = () => {

  const controllerChamados = new ControllerChamados();
  const {
    etapaAtual,
    setEtapaAtual,
    setorSelecionado,
    setSetorSelecionado,
    closeGlobalModal,
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

  const chatController = new ChatController();

  // Instancia o ChatManager com o setter de mensagens do contexto
  const chatManager = useMemo(() => new MensagemController(setMessagesLogado), [setMessagesLogado]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, [countdown, setCountdown]);

  // Função principal para envio de mensagens
  const handleSendMessagechatSuspenso = useCallback(
    async (text: string = messageUser, e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();

      // Etapa 1: Seleção de setor ou motivo
      if (etapaAtual === 0 && e) {
        if (!setorSelecionado) {
          const setorId = e.currentTarget.id;
          const setorNome = e.currentTarget.value;
          await chatController.handleSectorSelection(
            setorId,
            setMotivo,
            setEtapaAtual,
            SetSetorHelpdesk,
          );
          const responseUser = await controllerChamados.pegaUsuarioLogado();
          chatManager.sendMessage(setorNome, "user");
          chatManager.sendMessage(FluxoChatSuspenso[1].pergunta + ` ${responseUser}`, "bot");
          return;
        } else {
          const motivoEscolhido = e.currentTarget.value;
          setMotivoselecionado(motivoEscolhido);
          const motivoObject = await chatController.pegaMotivo(setorHelpDesk, motivoEscolhido);
          if (motivoObject && typeof motivoObject === "object") {
            setMotivo(motivoObject);
          }
          return;
        }
      }

      if (etapaAtual === 2 && e) {
        const motivoEscolhido = e.currentTarget.value;
        setMotivoselecionado(motivoEscolhido);
        const motivoObject = await chatController.pegaMotivo(setorHelpDesk, motivoEscolhido);
        setMotivoImage(motivoObject.src_img);
      }

      // Ação de "voltar"
      if (text === "voltar") {
        await chatController.handleBackAction(
          (msg, type, loading) => chatManager.sendMessage(msg, type, loading),
          setMessageUser,
          setCountdown,
          resetInterface,
        );
        return;
      }

      // Finalizar o chamado
      if (text === "Finalizar" && etapaAtual > 3) {
        setEtapaAtual(5);
        const responseUser = await controllerChamados.pegaUsuarioLogado();

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
        const initTitle = `Chamado: Nº: ${numChamadoNow}\n${motivoNome}\n${motivoselecionado}`;
        const chamado = new Chamado(setorHelpDesk, motivoImage ?? "", initTitle, descricao, status);
        const chamadoLogin = new ChamadoLogin(
          responseUser ?? " ",
          chamado.getSetorID(),
          chamado.getSrcImgCapa(),
          chamado.getTitulo(),
          chamado.getDescricao(),
          chamado.getStatus(),
        );

          controllerChamados.enviarChamado(
          chamado.getSetorID(),
          chamado.getSrcImgCapa(),
          `${chamado.getTitulo()} chamado de ${chamadoLogin.getNome()}`,
          chamado.getDescricao(),
          chamado.getStatus(),
        );

        chatManager.sendMessage(
          `${FluxoChatSuspenso[5].pergunta} esse é o Nº: ${numChamadoNow} do chamado`,
          "bot",
        );
       
        setTimeout(() => {
          setEtapaAtual(0)
          console.log(etapaAtual);
          
          chatController.handleFinalize(
            setCountdown,
            setDataUserChamados,
            dataUserChamados,
            resetInterface,
            setEtapaAtual
          );
        }, 500);

        return;
      }

      // Validação da descrição (etapaAtual === 3)
      if (etapaAtual === 3) {
        const validation = chatController.validateMessage(text);
        if (!validation.valid) {
          chatManager.sendMessage(validation.error!, "bot");
          return;
        }
      }

      // Armazena a mensagem digitada e envia a mensagem do usuário
      setDataUserChamados((prev: string[]) => [...prev, text]);
      chatController.sendUserMessage(text, (msg, type, loading) => chatManager.sendMessage(msg, type, loading), setMessageUser);

      const proximaEtapa = FluxoChatSuspenso[etapaAtual].next(text);
      // Envia mensagem com loading ("Escrevendo...")
      chatManager.sendMessage("Escrevendo...", "bot", true);

      // Atualiza a mensagem "Escrevendo..." após um delay
      setTimeout(() => {
        chatManager.updateFirstLoadingMessage(
          proximaEtapa !== null
            ? FluxoChatSuspenso[proximaEtapa].pergunta
            : "Obrigado pelas informações!",
        );

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
    },
    [
      etapaAtual,
      messageUser,
      setorSelecionado,
      setorHelpDesk,
      dataUserChamados,
      messagesLogado,
      setCountdown,
      setDataUserChamados,
      setFormDataChamados,
      setMessageUser,
      setMotivo,
      setMotivoselecionado,
      setMotivoImage,
      setNumChamado,
      setSetorSelecionado,
      setTitle,
    ],
  );

  const resetInterface = () => {
    closeGlobalModal();   
    chatManager.updateFirstLoadingMessage(FluxoChatSuspenso[0].pergunta);
    setDataUserChamados([]);
    setTitle(FluxoChatSuspenso[0].title);
    setSetorSelecionado(null);
  };

  return handleSendMessagechatSuspenso;
};
