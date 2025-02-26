import { useGlobalContext } from "@/context/globalContext";
import { fluxo, setores } from "../setores";
import { useEffect } from "react";
import { validateChat } from "./validateMessage";

type Message = {
  text: string;
  time: string;
  type: "user" | "bot";
  loading?: boolean;
};

export const useHandleSendMessage = () => {
  // Resolve o parâmetro assíncrono e armazena em um estado
  // const {empresaTag} = useParams()

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
  } = useGlobalContext();

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Ao chegar a 0, recarrega a página
      window.location.reload();
    }
  }, [countdown]);

  useEffect(() => {
    // Garante que a etapa 5 só será processada se a empresaTag já estiver disponível
    if (etapaAtual === 5 && countdown === null) {
      setTimeout(() => {
        const dadosChamado = {
          messages,
          setor: setorSelecionado,
          title,
          dataUserChamados, // Dados enviados pelo usuário
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
  ]);

  // Função auxiliar para adicionar uma nova mensagem
  const sendMessage = (
    newMessage: string,
    type: "user" | "bot",
    loading = false,
  ) => {
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
  };

  // Função principal para tratar o envio de mensagens
  const handleSendMessage = (text?: string) => {
    const messageToSend = text !== undefined ? text : messageUser;
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

    // Validação específica para a etapa 3:
    if (etapaAtual === 3) {
      if (!validateChat(messageToSend)) {
        sendMessage(
          "A descrição precisa ter no mínimo 50 caracteres, por favor tente novamente.",
          "bot",
        );
        // Se a validação não for atendida, interrompe o fluxo e mantém o usuário na etapa 3.
        return;
      }
    }

    // Se estivermos na etapa 1, define o setorSelecionado com o objeto completo
    if (etapaAtual === 1) {
      const setorObj = setores.find((setor) => setor.nome === messageToSend);
      if (setorObj) {
        setSetorSelecionado(setorObj);
      }
    }

    // Fluxo normal:
    // Armazena a mensagem enviada pelo usuário e a exibe
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
          if (proximaEtapa !== null) {
            updated[indexLoading] = {
              ...updated[indexLoading],
              text: fluxo[proximaEtapa].pergunta,
              loading: false,
              time: new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };
          } else {
            updated[indexLoading] = {
              ...updated[indexLoading],
              text: "Obrigado pelas informações!",
              loading: false,
              time: new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };
          }
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
