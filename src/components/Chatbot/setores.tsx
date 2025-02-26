export const setores = [
  {
    nome: "ti",
    motivo: ["sisplan", "itag", "outros"],
  },
  {
    nome: "Desenvolimento",
    motivo: ["mockup", "aprovação", "duvidas"],
  },
];

type EtapaFluxo = {
  id: number;
  title: string;
  pergunta: string;
  // A função "next" pode utilizar a resposta para decidir a próxima etapa
  next: (resposta: string) => number | null;
};

export const fluxo: EtapaFluxo[] = [
  {
    id: 0,
    title: "Abrir um chamado",
    pergunta: "Qual seu nome?",
    next: (resposta: string) => 1,
  },
  {
    id: 1,
    title: "Informe o Setor",
    pergunta: "De qual setor você fala?",
    next: (resposta: string) => 2,
  },
  {
    id: 2,
    title: "Informe o Motivo",
    pergunta: "Qual motivo do seu contato?",
    next: (resposta: string) => 3,
  },
  {
    id: 3,
    title: "Descreva seu chamado",
    pergunta: "Me conta detalhadamente oque deseja?",
    next: (resposta: string) => 4,
  },
  {
    id: 4,
    title: "Finalizando",
    pergunta: "Estou enviando seu chamado para o time, tudo bem?",
    next: (resposta: string) => 5,
  },
  {
    id: 5,
    title: "Finalizando",
    pergunta:
      "O time já recebeu seu chamado logo menos alguém entra em contato!",
    next: (resposta: string) => null,
  },
];
