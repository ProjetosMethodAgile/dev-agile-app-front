"use client";
import getCardHelpDeskId from "@/actions/HelpDesk/getCardHelpDeskId";
import { Form } from "@/components/form";
import {
  CardHelpDesk,
  CardHelpDeskSessao,
  ColumnsHelpDesk,
} from "@/types/api/apiTypes";
import iconsMap from "@/utils/iconsMap";
import { useEffect, useRef, useState, useCallback } from "react";
import formatDateSimple from "@/utils/formatDateSimple";
import Image from "next/image";
import InputTextMessage from "./InputTextMessage";
// Importa o hook do contexto WebSocket
import { useWebSocket } from "@/context/WebSocketContext";
import { postVinculaAtendenteToCardHelpdesk } from "@/actions/HelpDesk/postVinculaAtendenteToCardHelpdesk";
import { toast } from "react-toastify";
import getIniciaisNome from "@/utils/getIniciaisNome";
import MoveCardHelpdeskCotainer from "./MoveCardHelpdeskCotainer";

export type ModalCardHelpdeskProps = React.ComponentProps<"form"> & {
  currentCard: CardHelpDesk;
  currentSetor: string;
  currentColumn: ColumnsHelpDesk;
  closeModal: () => void;
};

export default function ModalCardHelpdesk({
  currentCard,
  closeModal,
  currentSetor,
  currentColumn,
  ...props
}: ModalCardHelpdeskProps) {
  const Voltar = iconsMap["voltar"];
  const Paperclip = iconsMap["Paperclip"];
  const Ingressar = iconsMap["UserRoundPlus"];

  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState<CardHelpDeskSessao | null>(null);
  const [message, setMessage] = useState("");
  const [moveCard, setMoveCard] = useState(false);
  // Ref para o final da lista de mensagens
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { ws } = useWebSocket();

  // Envolvendo a função getCardData com useCallback para estabilizá-la
  const getCardData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCardHelpDeskId(currentCard.id);
      if (data.data && data.ok) {
        setCard(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do card", error);
    }
    setLoading(false);
  }, [currentCard.id]);

  useEffect(() => {
    console.log(card);
  }, [card]);
  async function handleAddAtendente(sessao_id: string) {
    const response = await postVinculaAtendenteToCardHelpdesk(sessao_id);
    if (response.message && response.error) {
      toast.warning(response.message);
    } else if (response.message) {
      toast.success(response.message);
    }
  }
  // Busca os dados do card ao carregar ou ao mudar o cardId
  useEffect(() => {
    getCardData();
  }, [currentCard.id, getCardData]);

  // Atualiza o card se houver mensagem de atualização enviada pelo WebSocket
  useEffect(() => {
    if (!ws) return;
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === `messageUpdate-${currentCard.CardSessao.id}`) {
        getCardData();
      }
    };
    ws.addEventListener("message", messageHandler);
    return () => {
      ws.removeEventListener("message", messageHandler);
    };
  }, [ws, getCardData, currentCard.CardSessao.id]);

  // Sempre que as mensagens mudarem, rola para o final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [card?.CardSessao.MessageSessao]);

  return (
    <Form.Root
      className="max-h-[90dvh] overflow-x-hidden overflow-y-auto"
      onSubmit={(e) => e.preventDefault()}
      {...props}
    >
      <div className="flex gap-5">
        <Voltar
          className="mb-4 h-10 w-10 cursor-pointer self-start active:scale-95"
          aria-label="Fechar Modal"
          onClick={closeModal}
        />
        <div>
          {loading ? (
            <div className="h-8 w-48 animate-pulse rounded bg-gray-300"></div>
          ) : (
            <h1 className="text-2xl font-bold">{card?.titulo_chamado}</h1>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 sm:w-[800px] sm:flex-row">
        {/* column-1 */}
        <div className="flex w-full flex-col gap-2 sm:w-3/5">
          {loading ? (
            <>
              <div className="h-20 w-full animate-pulse rounded-xl bg-gray-300" />
              <div className="h-90 w-full animate-pulse rounded-xl bg-gray-300" />
            </>
          ) : (
            <Image
              src={
                card
                  ? card.src_img_capa
                  : "https://diskmadeiras.com.br/wp-content/uploads/2024/06/MDF-CINZA-URBANO-MATT-SOFT-06MM-1-FACE-EUCATEX.jpg"
              }
              width={1200}
              height={600}
              alt="Imagem do Card"
              quality={80}
              sizes="100vw"
              className="h-30 w-full rounded-xl object-cover"
            />
          )}
          {!loading && (
            <div className="min-h-90 rounded-xl">
              <div className="mirror-container flex h-90 flex-col rounded-xl p-2">
                {/* Área de mensagens */}
                <div className="mb-2 flex-1 overflow-y-auto">
                  {card?.CardSessao.MessageSessao &&
                  card.CardSessao.MessageSessao.length > 0
                    ? card.CardSessao.MessageSessao.map((msg, index) => {
                        const getMessageBgColor = (
                          isAtendente: boolean,
                          isMgsSystem: boolean,
                        ) => {
                          if (isMgsSystem) return "bg-gray-100"; // sistema
                          if (isAtendente) return "bg-blue-200"; // atendente
                          return "bg-yellow-100"; // cliente
                        };
                        const isAtendente = Boolean(msg.AtendenteMessage);
                        const isMgsSystem = msg.system_msg;
                        const senderName = isAtendente
                          ? msg.AtendenteMessage.UsuarioAtendente.nome
                          : msg.ClienteSessao?.nome || "Cliente Externo";
                        return (
                          <div
                            key={index}
                            className={`mb-4 rounded p-2 shadow ${getMessageBgColor(isAtendente, isMgsSystem)}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-primary-150 text-sm font-bold">
                                {!isMgsSystem
                                  ? senderName
                                  : "mensagem do sistema"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDateSimple(msg.createdAt)}
                              </span>
                            </div>
                            {msg.htmlBody ? (
                              <div
                                className="m-0 mt-1 text-base leading-tight whitespace-pre-line text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: msg.htmlBody,
                                }}
                              />
                            ) : (
                              <p className="m-0 mt-1 text-base leading-tight whitespace-pre-line text-gray-700">
                                {msg.content_msg}
                              </p>
                            )}
                          </div>
                        );
                      })
                    : null}
                  {/* Elemento que marca o final das mensagens */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input de nova mensagem */}
                <InputTextMessage
                  message={message}
                  setMessage={setMessage}
                  cardData={card}
                />
              </div>
            </div>
          )}
        </div>
        {/* column-2 */}
        <div className="flex w-full flex-col gap-2 sm:w-2/5">
          {loading ? (
            <div className="space-y-2">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300"></div>
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-300"></div>
            </div>
          ) : (
            <div className="bg-primary-150 rounded-2xl p-3">
              <span className="flex flex-wrap gap-1">
                <span>Solicitante: </span>
                {card?.CardSessao.MessageSessao.at(0)?.ClienteSessao?.nome ||
                  "solicitante externo"}
              </span>
              <span className="flex flex-wrap gap-1">
                <span>Data Criação: </span>
                {card && formatDateSimple(card.createdAt)}
              </span>
              <span className="flex flex-wrap gap-1">
                <span>Última interação: </span>
                {card && formatDateSimple(card.updatedAt)}
              </span>
              {card?.CardSessao.atendentesVinculados.length ? (
                <div className="flex flex-wrap gap-1">
                  <span>Atendentes: </span>

                  {card?.CardSessao.atendentesVinculados.map((atendente) => (
                    <p
                      key={atendente.KanbanSessoesAtendentes.atenden}
                      className="rounded-full bg-gray-600 p-1 font-bold hover:bg-gray-500"
                      title={atendente.UsuarioAtendente?.nome}
                    >
                      {getIniciaisNome(atendente?.UsuarioAtendente?.nome)}
                    </p>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          {!moveCard && (
            <div className="">
              {loading ? (
                <div className="mb-1 h-11 w-full animate-pulse rounded-xl bg-gray-300" />
              ) : (
                <div
                  onClick={() => setMoveCard((c) => !c)}
                  className="mb-1 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-green-500 p-2 text-2xl font-bold text-white hover:bg-green-600 active:scale-95"
                >
                  Mover Card
                </div>
              )}
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                {loading ? (
                  <>
                    <div className="h-11 w-full animate-pulse rounded-xl bg-gray-300 sm:w-1/3" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-gray-300 sm:w-2/3" />
                  </>
                ) : (
                  <>
                    <div className="text-1xl flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-500 p-2 font-bold text-white hover:bg-green-600 active:scale-95 sm:w-1/3">
                      <Paperclip />
                      Anexos
                    </div>
                    {card?.CardSessao && (
                      <div
                        onClick={() => handleAddAtendente(card?.CardSessao.id)}
                        className="text-1xl hover:bg-primary-100 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 p-2 font-bold text-white active:scale-95 sm:w-2/3"
                      >
                        <Ingressar />
                        Ingressar
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {moveCard && (
            <MoveCardHelpdeskCotainer
              setMoveCard={setMoveCard}
              setorAtual={currentSetor}
              colunaAtual={currentColumn.id}
              cardId={card?.id}
              acoesColuna={currentColumn.ColumnAcoes}
            />
          )}
        </div>
      </div>
    </Form.Root>
  );
}
