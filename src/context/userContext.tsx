"use client";
import React from "react";
import { UsuarioData } from "@/types/api/apiTypes";

type IUserContext = {
  user: UsuarioData | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioData | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser deve ser usado dentro do Provider");
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UsuarioData | null;
}) {
  const [userState, setUser] = React.useState<UsuarioData | null>(user);
  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
