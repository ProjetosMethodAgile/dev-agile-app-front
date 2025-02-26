"use client";
import React, { useState } from "react";
import { fluxo } from "@/components/Chatbot/setores";

type Message = {
  text: string;
  time: string;
  type: "user" | "bot";
  loading?: boolean;
};

type Setor = {
  nome: string;
  motivo: string[];
};

// Defina o tipo para os dados dos chamados
export interface FormDataChamados {
  messages: Message[];
  setor: Setor | null;
  title: string;
  dataUserChamados: string[];
}

type IGlobalContext = {
  card: HTMLDivElement | null;
  setCard: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  etapaAtual: number;
  setEtapaAtual: React.Dispatch<React.SetStateAction<number>>;
  setorSelecionado: Setor | null;
  setSetorSelecionado: React.Dispatch<React.SetStateAction<Setor | null>>;
  messageUser: string;
  setMessageUser: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  dataUserChamados: string[];
  setDataUserChamados: React.Dispatch<React.SetStateAction<string[]>>;
  countdown: number | null;
  setCountdown: React.Dispatch<React.SetStateAction<number | null>>;
  formDataChamados: FormDataChamados | null;
  setFormDataChamados: React.Dispatch<React.SetStateAction<FormDataChamados | null>>;
};

const GlobalContext = React.createContext<IGlobalContext | null>(null);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formDataChamados, setFormDataChamados] = useState<FormDataChamados | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dataUserChamados, setDataUserChamados] = useState<string[]>([]);
  const [title, setTitle] = useState<string>(fluxo[0].title);
  const [card, setCard] = useState<HTMLDivElement | null>(null);
  // Inicialize setorSelecionado como null e tipado como Setor ou null:
  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: fluxo[0].pergunta,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      type: "bot",
    },
  ]);
  const [etapaAtual, setEtapaAtual] = useState<number>(0);
  const [messageUser, setMessageUser] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        card,
        setCard,
        messages,
        setMessages,
        etapaAtual,
        setEtapaAtual,
        setorSelecionado,
        setSetorSelecionado,
        messageUser,
        setMessageUser,
        title,
        setTitle,
        dataUserChamados,
        setDataUserChamados,
        countdown,
        setCountdown,
        formDataChamados,
        setFormDataChamados,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
