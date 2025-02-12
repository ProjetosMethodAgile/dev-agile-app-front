"use client";

import getUser from "@/actions/getUser";
import logout from "@/actions/logout";
import { useParams } from "next/navigation";
import { UsuarioData } from "@/types/api/apiTypes";
import React from "react";

type IUserContext = {
  user: UsuarioData | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioData | null>>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser deve ser usado dentro do Provider");
  }
  return context;
};

const UserContext = React.createContext<IUserContext | null>(null);

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UsuarioData | null;
}) {
  const [userState, setUser] = React.useState<UsuarioData | null>(user);

  // Extraindo o parâmetro da URL
  const { empresaTag } = useParams();

  React.useEffect(() => {
    async function validate() {
      const { ok } = await getUser();
      if (!ok) {
        // Verifica se o parâmetro é válido antes de chamar o logout
        if (typeof empresaTag === "string") {
          await logout(empresaTag);
        }
      }
    }
    if (userState) {
      validate();
    }
  }, [userState, empresaTag]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
