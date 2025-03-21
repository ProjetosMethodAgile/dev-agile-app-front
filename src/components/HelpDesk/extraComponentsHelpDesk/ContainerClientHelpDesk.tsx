"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Kanban } from "..";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import { useEffect, useState, useCallback } from "react";
import { CardHelpDesk, ColumnsHelpDesk } from "@/types/api/apiTypes";
import getCardsHelpDeskBySetorId from "@/actions/HelpDesk/getCardsHelpDeskBySetorId";
import useSocket from "@/hooks/useSocket";

export type ContainerClientHelpDeskProps = React.ComponentProps<"div">;

export default function ContainerClientHelpDesk({
  ...props
}: ContainerClientHelpDeskProps) {
  const { currentSetor } = useGlobalContext();
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [cards, setCards] = useState<CardHelpDesk[]>([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

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

  useEffect(() => {
    fetchData();
  }, [currentSetor, fetchData]);

  // Efeito para escutar os eventos do socket
  useEffect(() => {
    if (!socket) return;
    // Escuta os eventos do kanban e atualiza os dados
    socket.on("cardCreated", fetchData);
    socket.on("cardUpdated", fetchData);
    socket.on("cardDeleted", fetchData);
    socket.on("columnCreated", fetchData);
    socket.on("columnUpdated", fetchData);

    // Limpeza: remove os ouvintes quando o componente desmontar ou socket mudar
    return () => {
      socket.off("cardCreated", fetchData);
      socket.off("cardUpdated", fetchData);
      socket.off("cardDeleted", fetchData);
      socket.off("columnCreated", fetchData);
      socket.off("columnUpdated", fetchData);
    };
  }, [socket, fetchData]);

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
