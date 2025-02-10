"use client";

import getUser from "@/actions/getUser";
import logout from "@/actions/logout";
import { validaToken } from "@/actions/validaToken";
import { UsuarioData } from "@/types/api/apiTypes";
import React from "react";

type IUserContext = {
  user: UsuarioData | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioData | null>>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useContext deve estar dentro do Provider");
  }
  return context;
};
const UserContext = React.createContext<IUserContext | null>(null);

async function validaAuth() {
  const data = await validaToken();
  console.log(data);
}
validaAuth();

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UsuarioData | null;
}) {
  const [userState, setUser] = React.useState<UsuarioData | null>(user);

  React.useEffect(() => {
    async function validate() {
      const { ok } = await getUser();
      if (!ok) await logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
