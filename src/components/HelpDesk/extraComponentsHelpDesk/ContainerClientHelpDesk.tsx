"use client";
import { useGlobalContext } from "@/context/globalContext";
import { Kanban } from "..";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import { useEffect, useState } from "react";
import { CardHelpDesk, ColumnsHelpDesk } from "@/types/api/apiTypes";
import getCardsHelpDeskBySetorId from "@/actions/HelpDesk/getCardsHelpDeskBySetorId";

export type ContainerClientHelpDeskProps = React.ComponentProps<"div">;

export default function ContainerClientHelpDesk({
  ...props
}: ContainerClientHelpDeskProps) {
  const { currentSetor } = useGlobalContext();
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [cards, setCards] = useState<CardHelpDesk[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchColumns() {
      if (!currentSetor) return;
      setLoading(true);
      const { data } = await getColumnsHelpDeskForUser(currentSetor);
      if (data) {
        setColumns(data);
        const card = await getCardsHelpDeskBySetorId(currentSetor);
        console.log(card);

        if (card && card.data) {
          setCards(card.data);
        }
      } else {
        setColumns([]);
      }
      setLoading(false);
    }
    fetchColumns();
  }, [currentSetor]);

  if (loading) return <div>Carregando colunas...</div>;

  return (
    <div {...props}>
      <Kanban.Root>
        {columns.length > 0 ? (
          columns.map((column) => (
            <Kanban.Column title={column.nome} key={column.id}>
              {cards.length &&
                cards
                  .filter((card) => card.column_id === column.id)
                  .map((card) => (
                    <Kanban.Card
                      titleCard={card.titulo_chamado}
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
