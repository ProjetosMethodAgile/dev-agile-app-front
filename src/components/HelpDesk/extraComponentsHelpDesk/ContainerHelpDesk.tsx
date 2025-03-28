"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Kanban } from "..";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import getCardsHelpDeskBySetorId from "@/actions/HelpDesk/getCardsHelpDeskBySetorId";
import { useEffect, useState, useCallback } from "react";
import { CardHelpDesk, ColumnsHelpDesk } from "@/types/api/apiTypes";
import useKanbanWebSocket from "@/hooks/useKanbanWebSocket";
import ModalCardHelpdesk from "./ModalCardHelpdesk/ModalCardHelpdesk";

export default function ContainerHelpDesk(props: React.ComponentProps<"div">) {
  const { currentSetor, openGlobalModal, closeGlobalModal } =
    useGlobalContext();
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [cards, setCards] = useState<CardHelpDesk[]>([]);
  const [loading, setLoading] = useState(false);

  const ws = useKanbanWebSocket();

  // Função para buscar dados do Kanban
  const fetchData = useCallback(async () => {
    if (!currentSetor) return;
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
    setLoading(false);
  }, [currentSetor]);

  // Função para atualizar o column_id de um card
  const updateCardColumn = useCallback(
    (cardId: string, newColumnId: string) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, column_id: newColumnId } : card,
        ),
      );
    },
    [],
  );

  // Busca inicial
  useEffect(() => {
    fetchData();
  }, [currentSetor, fetchData]);

  // Escuta mensagens do WebSocket para atualizar a interface
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "cardCreated" ||
        data.type === `cardCreated-${currentSetor}` ||
        data.type === "cardUpdated" ||
        data.type === "cardDeleted" ||
        data.type === "columnCreated" ||
        data.type === "columnUpdated"
      ) {
        fetchData();
      }
    };
  }, [currentSetor, ws, fetchData]);

  async function openCurrentCard(currentCard: CardHelpDesk) {
    openGlobalModal(
      <ModalCardHelpdesk
        cardId={currentCard.id}
        closeModal={closeGlobalModal}
      />,
    );
  }

  if (loading) return <div>Carregando colunas...</div>;
  return (
    <div {...props}>
      <Kanban.Root>
        {columns.length > 0 ? (
          columns.map((column) => (
            <Kanban.Column
              title={column.nome}
              columnId={column.id}
              key={column.id}
              onCardDrop={updateCardColumn} // Passa a função para atualizar o card
            >
              {cards
                .filter((card) => card.column_id === column.id)
                .map((card) => (
                  <Kanban.Card
                    titleCard={card.titulo_chamado}
                    cardId={card.id}
                    key={card.id}
                    openCard={() => openCurrentCard(card)}
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
