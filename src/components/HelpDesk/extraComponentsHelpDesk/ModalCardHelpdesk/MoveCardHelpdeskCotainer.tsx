import React, { SetStateAction, useEffect, useState } from "react";
import InputSelectHelpDesk from "../InputSelectHelpDesk";
import getColumnsHelpDeskForUser from "@/actions/HelpDesk/getColumnsHelpDeskForUser";
import { ColumnsHelpDesk } from "@/types/api/apiTypes";
import putPosicaoCardColumnid from "@/actions/HelpDesk/putPosicaoCardColumnid";
import { toast } from "react-toastify";
import { identificaAcao } from "@/functions/helpdesk/acoes_helpdesk";
import { getAcoesColuna } from "@/actions/HelpDesk/AcoesColuna/getAcoesColuna";

export type MoveCardHelpdeskCotainerProps = React.ComponentProps<"div"> & {
  setMoveCard: React.Dispatch<SetStateAction<boolean>>;
  setorAtual: string;
  colunaAtual: string;
  acoesColuna: {
    id: string;
    nome: string;
    descricao: string;
  }[];
  cardId?: string;
};

export default function MoveCardHelpdeskCotainer({
  setMoveCard,
  setorAtual,
  colunaAtual,
  acoesColuna,
  cardId,
  ...props
}: MoveCardHelpdeskCotainerProps) {
  const [columns, setColumns] = useState<ColumnsHelpDesk[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("");

  useEffect(() => {
    async function getColumn(setorAtual: string) {
      setLoading(true);
      const response = await getColumnsHelpDeskForUser(setorAtual);
      if (response.ok && response.data) {
        setColumns(response.data);

        // <-- inicializa currentColumn com o primeiro id (excluindo a colunaAtual, se quiser)
        const primeira = response.data.find((c) => c.id !== colunaAtual);
        if (primeira) {
          setCurrentColumn(primeira.id);
        }
      }
      setLoading(false);
    }
    getColumn(setorAtual);
  }, [setorAtual, colunaAtual, setCurrentColumn]);

  async function handleMoveCard(cardId: string, column_id: string) {
    const acoesFromColumn = await getAcoesColuna(column_id);
    if (acoesFromColumn.ok && acoesFromColumn.data) {
      if (acoesColuna.length) {
        const nomeAcoes = acoesFromColumn.data.ColumnAcoes.map((a) => a.nome);
        await identificaAcao({
          nomeAcoes: nomeAcoes,
          column: acoesFromColumn.data,
          cardId,
        });
        setMoveCard(false);
      }
    }
    const result = await putPosicaoCardColumnid(cardId, column_id, setorAtual);

    if (result.data && result.ok) {
      toast.success(result.data);
    } else {
      toast.error(result.error);
    }
  }
  return (
    <div {...props} className="animate-move-left-to-right">
      <h1>Mover card </h1>
      <h1>para:</h1>
      {!loading ? (
        <>
          <InputSelectHelpDesk
            options={columns
              .filter((c) => colunaAtual !== c.id)
              .map((c) => ({ id: c.id, nome: c.nome }))}
            defaultOption={false}
            setCurrentColumn={setCurrentColumn}
            currentColumn={currentColumn}
            columnSelect={true}
          />
          {cardId && (
            <button
              onClick={() => handleMoveCard(cardId, currentColumn)}
              className="mb-1 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-green-600 p-2 text-2xl font-bold text-white hover:bg-green-700 active:scale-95"
            >
              Confirmar
            </button>
          )}
        </>
      ) : (
        <>
          <div className="mb-1 h-11 animate-pulse rounded-[12px] border-2 border-transparent bg-gray-300 py-2 pl-4 text-xl outline-0 transition-all placeholder:text-xl placeholder:text-gray-600/50"></div>
          <div className="mb-1 h-11 animate-pulse rounded-[12px] border-2 border-transparent bg-gray-300 py-2 pl-4 text-xl outline-0 transition-all placeholder:text-xl placeholder:text-gray-600/50"></div>
        </>
      )}

      <button
        className="mb-1 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-red-600 p-2 text-2xl font-bold text-white hover:bg-red-700 active:scale-95"
        onClick={() => setMoveCard((c) => !c)}
      >
        Cancelar
      </button>
    </div>
  );
}
