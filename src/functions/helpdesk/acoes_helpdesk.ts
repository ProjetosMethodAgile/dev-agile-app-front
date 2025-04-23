import { ColumnsHelpDesk } from "@/types/api/apiTypes";

type identificaAcaoProps = {
  nomeAcoes: string[];
  column: ColumnsHelpDesk;
  cardId: string;
};

// async function enviaEmail() {}

const acoesHelpDesk = [
  {
    nome: "nenhuma",
    funcao: (column: ColumnsHelpDesk, cardId: string) =>
      console.log(column, cardId),
  },
  {
    nome: "envia e-mail",
    funcao: (column: ColumnsHelpDesk, cardId: string) => {
      console.log("cardId");
      console.log(cardId);
      console.log(column.id);
      console.log(column.nome);
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

console.log(acoesHelpDesk);
