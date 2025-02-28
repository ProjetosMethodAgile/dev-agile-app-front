// src/components/Chatbot/ChatFunction/useHandleSendMessage.tsx
import { useGlobalContext } from "@/context/globalContext";
import { fluxo, setores } from "../setores";
import { useEffect, useCallback } from "react";
import GerenciaChat_Controller from "@/components/Chatbot/ChatFunction/GerenciaChat_Controller";

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
  } = useGlobalContext();

  const gerenciaChat_controller = new GerenciaChat_Controller();

  // Contagem regressiva para recarregar a página
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, [countdown, setCountdown]);

  // Função sendMessage para criar e adicionar mensagens
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

  // Quando a etapa é 5, finaliza o fluxo de atendimento
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
   * @param text - Texto a ser enviado. Se não informado, utiliza o estado messageUser.
   * @param e - Evento de clique opcional, utilizado para capturar o id do botão.
   */
  const handleSendMessage = async (
    text: string = messageUser,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {

    if (etapaAtual === 1 && e) {
      // Etapa 1: Seleção de setor
      const setorId = e.currentTarget.id; // geralmente o id do setor
      // Busca os motivos para o setor e atualiza o global context
      await gerenciaChat_controller.pegaMotivoPorID(setorId, setMotivo);

      // Atualiza o setor selecionado com base no setor escolhido
      const setorObj = setores.find((s) => s.nome === text);
      if (setorObj) {
        setSetorSelecionado(setorObj);
      }
      // Após selecionar o setor, muda para a etapa 2 para escolher o motivo
      setEtapaAtual(2);
      return;
    }

    if (etapaAtual === 2 && e) {
      // Etapa 2: Seleção de motivo
      // Aqui, o usuário clica em um motivo já carregado. Processa a mensagem normalmente.
      // Opcionalmente, você pode definir alguma lógica extra para motivo, se necessário.
    }

    if (text === "Descrição") {
      await gerenciaChat_controller.enviaMensagem(sendMessage, setMessageUser, text);
      // Reseta a interface: atualiza a pergunta inicial, limpa o setor selecionado, etc.
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
        setEtapaAtual(0);
        setTitle(fluxo[0].title);
        setSetorSelecionado(null);
      }, 1000);
      return;
    }

    // Etapa 3: Validação do tamanho da mensagem (por exemplo, descrição longa)
    if (etapaAtual === 3) {
      const isValid = await gerenciaChat_controller.validaMensagem(text);
      if (!isValid) {
        const contador = text.length;
        sendMessage(
          `A descrição precisa ter no mínimo 50 caracteres, você só escreveu ${contador} - por favor, tente novamente.`,
          "bot"
        );
        return;
      }
    }

    // Se estivermos na etapa 1 e não houve clique (por exemplo, input manual), tenta definir o setor
    if (etapaAtual === 1) {
      const setorObj = setores.find((s) => s.nome === text);
      if (setorObj) {
        setSetorSelecionado(setorObj);
      }
    }

    // Atualiza os dados do chamado com a mensagem do usuário
    setDataUserChamados((prevData: string[]) => [...prevData, text]);
    console.log(dataUserChamados);

    // Fluxo normal de envio da mensagem
    sendMessage(text, "user");
    setMessageUser("");

    const respostaUsuario = text;
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
