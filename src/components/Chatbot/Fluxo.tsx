

type EtapaFluxo = {
  id: number;
  title: string;
  pergunta: string;
  // A função "next" recebe uma resposta mas não a utiliza, então fazemos um "void" nela para marcar como utilizada.
  next: (resposta: string) => number | null;
};

export const fluxo: EtapaFluxo[] = [
  {
    id: 1,
    title: "Abrir um chamado",
    pergunta: "Qual seu nome?",
    next: (resposta: string) => {
      void resposta;
      return 1;
    },
  },
  {
    id: 2,
    title: "Informe o Setor",
    pergunta: "De qual setor você fala?",
    next: (resposta: string) => {
      void resposta;
      return 2;
    },
  },
  {
    id: 3,
    title: "Informe o Motivo",
    pergunta: "Qual motivo do seu contato?",
    next: (resposta: string) => {
      void resposta;
      return 3;
    },
  },
  {
    id: 4,
    title: "Descreva seu chamado",
    pergunta: "Me conta detalhadamente oque deseja?",
    next: (resposta: string) => {
      void resposta;
      return 4;
    },
  },
  {
    id: 5,
    title: "Finalizando",
    pergunta: "Estou enviando seu chamado para o time, tudo bem?",
    next: (resposta: string) => {
      void resposta;
      return 5;
    },
  },
  {
    id: 6,
    title: "Finalizando",
    pergunta:
      "O time já recebeu seu chamado logo menos alguém entra em contato!",
    next: (resposta: string) => {
      void resposta;
      return null;
    },
  },
];
