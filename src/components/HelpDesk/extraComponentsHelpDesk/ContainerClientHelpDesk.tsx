// src/app/ContainerClientHelpDesk.tsx
"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Kanban } from "..";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import getCardsHelpDeskBySetorId from "@/actions/HelpDesk/getCardsHelpDeskBySetorId";
import { useEffect, useState, useCallback } from "react";
import { CardHelpDesk, ColumnsHelpDesk } from "@/types/api/apiTypes";
import useKanbanWebSocket from "@/hooks/useKanbanWebSocket";

export default function ContainerClientHelpDesk(
  props: React.ComponentProps<"div">,
) {
  const { currentSetor } = useGlobalContext();
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [cards, setCards] = useState<CardHelpDesk[]>([]);
  const [loading, setLoading] = useState(false);

  const ws = useKanbanWebSocket();

  // Função para buscar dados do kanban
  const fetchData = useCallback(async () => {
    if (!currentSetor) return;
    setLoading(true);

    const { data } = await getColumnsHelpDeskForUser(currentSetor);
    if (data) {
      setColumns(data);
      const cardResponse = await getCardsHelpDeskBySetorId(currentSetor);
      if (cardResponse && cardResponse.data) {
        setCards(cardResponse.data);
      }
    } else {
      setColumns([]);
    }
    setLoading(false);
  }, [currentSetor]);

  // Busca inicial
  useEffect(() => {
    fetchData();
  }, [currentSetor, fetchData]);

  // Escuta mensagens do WS para atualizar a interface
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "cardCreated" ||
        data.type === "cardUpdated" ||
        data.type === "cardDeleted" ||
        data.type === "columnCreated" ||
        data.type === "columnUpdated"
      ) {
        fetchData();
      }
    };
  }, [ws, fetchData]);

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
            >
              {cards
                .filter((card) => card.column_id === column.id)
                .map((card) => (
                  <Kanban.Card
                    titleCard={card.titulo_chamado}
                    cardId={card.id}
                    key={card.id}
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
