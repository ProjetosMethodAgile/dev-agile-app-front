type identificaAcaoProps = {
  nomeAcoes?: string[];
  idAcoes?: string[];
};

export async function identificaAcao({
  nomeAcoes,
  idAcoes,
}: identificaAcaoProps) {
  if (nomeAcoes) {
    console.log(nomeAcoes);
    console.log(idAcoes);
    nomeAcoes.map((acao) => {
      const nome = acao.trim().toLowerCase();
      console.log(nome);
    });
  } else {
    return;
  }
}

const acoesHelpDesk = [
  {
    nome: "nenhuma",
    funcao: () => console.log(),
  },
  {
    nome: "envia e-mail",
    funcao: () => console.log(),
  },
];

console.log(acoesHelpDesk);
