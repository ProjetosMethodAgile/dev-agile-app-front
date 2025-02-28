
import { useGlobalContext } from "@/context/globalContext";
import { fluxo, setores } from "../setores";
import { useEffect, useCallback } from "react";
import { validateChat } from "./validateMessage";
import { SetorHelpDesk } from "@/types/api/apiTypes";
import { GET_MOTIVO } from "@/functions/api";
import getMotivoSetor from "@/actions/getMotivoSetor";

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
    setMotivo
  } = useGlobalContext();

  // Tratamento de contagem regressiva para recarregar a página
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, [countdown, setCountdown]);

  // Função sendMessage estável com useCallback
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
    [setMessages]
  );

  // Efetua ação quando a etapa é 5
  useEffect(() => {
    if (etapaAtual === 5 && countdown === null) {
      setTimeout(() => {
        const dadosChamado = {
          messages,
          setor: setorSelecionado,
          title,
          dataUserChamados,
        };
        sendMessage("Finalizando...", "bot");
        setFormDataChamados(dadosChamado);
        setCountdown(5);
      }, 3500);
    }
  }, [
    etapaAtual,
    countdown,
    messages,
    setorSelecionado,
    title,
    dataUserChamados,
    sendMessage,
    setCountdown,
    setFormDataChamados,
  
  ]);

  /**
   * Função principal para tratar o envio de mensagens.
   * @param text - Texto a ser enviado. Se não fornecido, utiliza o estado messageUser.
   * @param e - Evento de clique opcional, utilizado para capturar o id do botão.
   */
  const handleSendMessage = async (
    text: string = messageUser,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Se o evento for fornecido, captura e exibe o id do botão clicado
    if (e) {
      const setorMotivo = e.currentTarget.id;
console.log(setorMotivo);

      const response =  await getMotivoSetor(setorMotivo)
      console.log(response);
     
    }

    const messageToSend = text;
    if (!messageToSend.trim()) return;

    // Caso especial: "Descrição" – volta ao início do fluxo
    if (messageToSend === "Descrição") {
      sendMessage(messageToSend, "user");
      setMessageUser("");
      sendMessage("Escrevendo...", "bot", true);

      setTimeout(() => {
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
        // Reseta os estados para o início do fluxo
        setEtapaAtual(0);
        setTitle(fluxo[0].title);
        setSetorSelecionado(null);
      }, 1000);
      return;
    }

    // Validação específica para a etapa 3
    if (etapaAtual === 3) {
      if (!validateChat(messageToSend)) {
        const contador = messageToSend.length;
        sendMessage(
          `A descrição precisa ter no mínimo 50 caracteres, você só escreveu ${contador} por favor tente novamente.`,
          "bot"
        );
        return;
      }
    }

    // Se estivermos na etapa 1, define o setorSelecionado com o objeto completo
    if (etapaAtual === 1) {
      const setorObj = setores.find((s) => s.nome === messageToSend);
      if (setorObj) {
        setSetorSelecionado(setorObj);
      }
    }

    // Fluxo normal: armazena a mensagem enviada e atualiza os estados
    setDataUserChamados((prevData: string[]) => [...prevData, messageToSend]);
    sendMessage(messageToSend, "user");
    setMessageUser("");

    const respostaUsuario = messageToSend;
    const proximaEtapa = fluxo[etapaAtual].next(respostaUsuario);

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

      // Atualiza os estados conforme a próxima etapa do fluxo
      if (proximaEtapa !== null) {
        setEtapaAtual(proximaEtapa);
        setTitle(fluxo[proximaEtapa].title);
      } else {
        setTitle("");
      }
    }, 1000);
  };

  return handleSendMessage;
};
