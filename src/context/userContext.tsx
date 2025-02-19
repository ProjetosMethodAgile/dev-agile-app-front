"use client";
import React from "react";
import { UsuarioData, PermissaoCompletaData } from "@/types/api/apiTypes";

type IUserContext = {
  user: UsuarioData | null;
  // Agora o contexto também armazena as permissões completas (telas e ações)
  permissions: PermissaoCompletaData[] | null;
  setUser: React.Dispatch<React.SetStateAction<UsuarioData | null>>;
  setPermissions: React.Dispatch<
    React.SetStateAction<PermissaoCompletaData[] | null>
  >;

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
  permissions,
}: {
  children: React.ReactNode;
  user: UsuarioData | null;
  permissions?: PermissaoCompletaData[] | null;
}) {

  const [userState, setUser] = React.useState<UsuarioData | null>(user);
  const [permissionsState, setPermissions] = React.useState<

    PermissaoCompletaData[] | null
    >(permissions ? permissions : null);
  return (
    <UserContext.Provider
      value={{
        user: userState,
        permissions: permissionsState,
        setUser,
        setPermissions
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
