"use client";
import React from "react";

type IGlobalContext = {
  card: HTMLDivElement | null;
  setCard: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
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
  const [card, setCard] = React.useState<HTMLDivElement | null>(null);

  return (
    <GlobalContext.Provider value={{ card, setCard }}>
      {children}
    </GlobalContext.Provider>
  );
}
