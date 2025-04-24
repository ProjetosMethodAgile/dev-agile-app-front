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
