"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Kanban } from "..";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import getCardsHelpDeskBySetorId from "@/actions/HelpDesk/getCardsHelpDeskBySetorId";
import { useEffect, useState, useCallback } from "react";
import { CardHelpDesk, ColumnsHelpDesk } from "@/types/api/apiTypes";
// Importa o hook do contexto – useWebSocket exportado pelo provider
import { useWebSocket } from "@/context/WebSocketContext";
import ModalCardHelpdesk from "./ModalCardHelpdesk/ModalCardHelpdesk";

export default function ContainerHelpDesk(props: React.ComponentProps<"div">) {
  const { currentSetor, openGlobalModal, closeGlobalModal } =
    useGlobalContext();
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [cards, setCards] = useState<CardHelpDesk[]>([]);
  // const [loading, setLoading] = useState(false);

  const { ws } = useWebSocket();

  // Função para buscar dados do Kanban
  const fetchData = useCallback(async () => {
    if (!currentSetor) return;
    // setLoading(true);
    try {
      const { data } = await getColumnsHelpDeskForUser(currentSetor);
      if (data) {
        setColumns(data);
        const cardResponse = await getCardsHelpDeskBySetorId(currentSetor);
        if (cardResponse && cardResponse.data) {
          setCards(cardResponse.data);
        }
      } else {
        setColumns([]);
        setCards([]);
      }
    } catch (err) {
      console.error("Erro na busca dos dados do Kanban:", err);
    }
    // setLoading(false);
  }, [currentSetor]);

  // Busca inicial ao alterar o setor
  useEffect(() => {
    fetchData();
  }, [currentSetor, fetchData]);

  // Escuta as mensagens do WebSocket para atualizar a interface
  useEffect(() => {
    if (!ws) return;

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      // Verifica se algum card da lista corresponde ao tipo recebido desse setor
      const hasUpdatedCard = cards.some(
        (card) => data.type === `cardUpdated-${card.id}`,
      );

      if (
        data.type === `cardCreated-${currentSetor}` ||
        hasUpdatedCard ||
        data.type === `cardUpdated-${currentSetor}` ||
        data.type === "cardUpdated" ||
        data.type === "cardDeleted" ||
        data.type === "columnCreated" ||
        data.type === "columnUpdated"
      ) {
        fetchData();
      }
    };

    ws.addEventListener("message", messageHandler);
    return () => {
      ws.removeEventListener("message", messageHandler);
    };
  }, [currentSetor, ws, fetchData, cards]);

  // Abre o modal com o card atual
  async function openCurrentCard(
    currentCard: CardHelpDesk,
    column: ColumnsHelpDesk,
  ) {
    openGlobalModal(
      <ModalCardHelpdesk
        currentCard={currentCard}
        closeModal={closeGlobalModal}
        currentSetor={currentSetor}
        currentColumn={column}
      />,
    );
  }

  return (
    <div {...props}>
      <Kanban.Root>
        {columns.length > 0 ? (
          columns.map((column) => (
            <Kanban.Column
              title={column.nome}
              key={column.id}
              column={column}
              currentSetor={currentSetor}
              onCardDrop={(cardId: string, newColumnId: string) =>
                setCards((prevCards) =>
                  prevCards.map((card) =>
                    card.id === cardId
                      ? { ...card, column_id: newColumnId }
                      : card,
                  ),
                )
              }
            >
              {cards
                .filter((card) => card.column_id === column.id)
                .map((card) => (
                  <Kanban.Card
                    card={card}
                    cardId={card.id}
                    key={card.id}
                    openCard={() => openCurrentCard(card, column)}
                  />
                ))}
            </Kanban.Column>
          ))
        ) : (
          <h1>Sem colunas cadastradas no setor</h1>
        )}
      </Kanban.Root>
    </div>
  );
}
