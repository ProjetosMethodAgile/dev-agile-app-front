"use client";
import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fluxo } from "@/components/Chatbot/Fluxo";

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
  setorHelpDesk: string;
  SetSetorHelpdesk: React.Dispatch<React.SetStateAction<string>>;
  dataUserChamados: string[];
  setDataUserChamados: React.Dispatch<React.SetStateAction<string[]>>;
  countdown: number | null;
  setCountdown: React.Dispatch<React.SetStateAction<number | null>>;
  formDataChamados: FormDataChamados | null;
  openGlobalModal: (content: React.ReactNode) => void;
  closeGlobalModal: () => void;
  setFormDataChamados: React.Dispatch<
    React.SetStateAction<FormDataChamados | null>
  >;
  motivo: string[] | null;
  setMotivo: React.Dispatch<React.SetStateAction<string[] | null>>;
  motivoID: string | null;
  setMotivoID: React.Dispatch<React.SetStateAction<string | null>>;
  motivoImage: string | null;
  setMotivoImage: React.Dispatch<React.SetStateAction<string | null>>;
  numChamado: string | null;
  setNumChamado: React.Dispatch<React.SetStateAction<string | null>>;
  setMotivoselecionado: React.Dispatch<React.SetStateAction<string>>;
  motivoselecionado:string | null; 
  currentSetor: string;
  setCurrentSetor: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = React.createContext<IGlobalContext | null>(null);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }
  return context;
};

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formDataChamados, setFormDataChamados] =
    useState<FormDataChamados | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dataUserChamados, setDataUserChamados] = useState<string[]>([]);
  const [title, setTitle] = useState<string>(fluxo[0].title);
  const [card, setCard] = useState<HTMLDivElement | null>(null);
  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null);
  const [setorHelpDesk, SetSetorHelpdesk] = useState<string>("");
  const [motivoselecionado, setMotivoselecionado] = useState<string>("");

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

  const [globalModalContent, setGlobalModalContent] =
    useState<React.ReactNode | null>(null);
  const openGlobalModal = (content: React.ReactNode) => {
    setGlobalModalContent(content);
  };
  const closeGlobalModal = () => {
    setGlobalModalContent(null);
  };
  const [motivo, setMotivo] = useState<string[] | null>(null);
  const [motivoID, setMotivoID] = useState<string | null>(null);
  const [motivoImage, setMotivoImage] = useState<string | null>(null);
  const [numChamado, setNumChamado] = useState<string | null>(null);

  //================HELP-DESK=========================//

  const [currentSetor, setCurrentSetor] = useState<string>("");
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
        openGlobalModal,
        closeGlobalModal,
        motivo,
        setMotivo,
        setorHelpDesk,
        SetSetorHelpdesk,
        currentSetor,
        setCurrentSetor,
        motivoID, 
        setMotivoID,
        motivoImage,
        setMotivoImage,
        motivoselecionado, 
        setMotivoselecionado,
        numChamado, setNumChamado
      }}
    >
      {children}
      {globalModalContent && (
        <Modal className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          {globalModalContent}
        </Modal>
      )}
      {/* ToastContainer ficará disponível em toda a aplicação */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalContext.Provider>
  );
}
