import { changeStatusCard } from "@/actions/HelpDesk/AcoesColuna/postChangeStatusCard";
import { postEnviaEmailHelpDesk } from "@/actions/HelpDesk/AcoesColuna/postEnviaEmailHelpDesk";
import { ColumnsHelpDesk } from "@/types/api/apiTypes";

type identificaAcaoProps = {
  nomeAcoes: string[];
  column: ColumnsHelpDesk;
  cardId: string;
};

const acoesHelpDesk = [
  {
    nome: "nenhuma",
    funcao: async (column: ColumnsHelpDesk, cardId: string) =>
      console.log(column, cardId),
  },
  {
    nome: "envia e-mail",
    funcao: async (column: ColumnsHelpDesk, cardId: string) => {
      await postEnviaEmailHelpDesk(cardId, column.nome);
    },
  },
  {
    nome: "muda status card para - em aberto",
    funcao: async (_column: ColumnsHelpDesk, cardId: string) =>
      await changeStatusCard(cardId, "Em Aberto"),
  },
  {
    nome: "muda status card para - em andamento",
    funcao: async (_column: ColumnsHelpDesk, cardId: string) =>
      await changeStatusCard(cardId, "Em Andamento"),
  },
  {
    nome: "muda status card para - encerrado",
    funcao: async (_column: ColumnsHelpDesk, cardId: string) =>
      await changeStatusCard(cardId, "Encerrado"),
  },
];

export async function identificaAcao({
  nomeAcoes,
  column,
  cardId,
}: identificaAcaoProps) {
  if (nomeAcoes && column) {
    nomeAcoes.map((nomeAcao) => {
      const nome = nomeAcao.trim().toLowerCase();
      acoesHelpDesk.map((acao) => {
        if (acao.nome === nome) {
          acao.funcao(column, cardId);
        }
      });
    });
  } else {
    return;
  }
}
