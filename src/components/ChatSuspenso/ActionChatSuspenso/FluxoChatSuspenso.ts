

type EtapaFluxo = {
    id: number;
    title: string;
    pergunta: string;
    // A função "next" recebe uma resposta mas não a utiliza, então fazemos um "void" nela para marcar como utilizada.
    next: (resposta: string) => number | null;
  };
  
  
  
  export const FluxoChatSuspenso: EtapaFluxo[] = [
    {
      id: 1,
      title: "Abrir um chamado",
      pergunta: "Com quem você quer falar?",
      next: (resposta: string) => {
        void resposta;
        return 1;
      },
    },
    {
      id: 2,
      title: "Abrir um chamado",
      pergunta: "Qual motivo so chamado",
      next: (resposta: string) => {
        void resposta;
        return 2;
      },
    },
    {
      id: 3,
      title: "Abrir um chamado",
      pergunta: "Descreva detalhadamente seu chamado",
      next: (resposta: string) => {
        void resposta;
        return 3;
      },
    },
    {
      id: 4,
      title: "Abrir um chamado",
      pergunta: "Descreva detalhadamente seu chamado",
      next: (resposta: string) => {
        void resposta;
        return 4;
      },
    },
    {
      id: 4,
      title: "Abrir um chamado",
      pergunta: "Seu chamado será enviado para o time tudo bem?",
      next: (resposta: string) => {
        void resposta;
        return 4;
      },
    },
    {
      id: 5,
      title: "Abrir um chamado",
      pergunta: "Chamado enviado",
      next: (resposta: string) => {
        void resposta;
        return 5;
      },
    },
]