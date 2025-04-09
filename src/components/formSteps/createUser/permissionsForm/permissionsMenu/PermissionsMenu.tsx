import { PermissoesRole } from "@/types/api/apiTypes";
import React, { useState } from "react";
import PermissionsNavigationForm from "../layout";
import ScreeConfig from "./screen/ScreenConfig";
import SubScreenConfig from "./subscreen/SubScreenConfig";

type PermissionsMenuProps = {
  permissoesData: PermissoesRole[];
};

type CrudPermissions = {
  create: boolean;
  update: boolean;
  delete: boolean;
};

export type PermissionsState = {
  [screenId: string]: {
    screenId: string;
    screenName: string;
    access: boolean;
    crud: CrudPermissions;
  };
};

export default function PermissionsMenu({
  permissoesData,
}: PermissionsMenuProps) {
  const [activeTab, setActiveTab] = useState("informacoes");
  const [actions, setActions] = useState<PermissionsState>({});

  function handleToggleCrud(
    screenId: string,
    screenName: string,
    crudType: "access" | "update" | "delete" | "create",
  ) {
    setActions((prev) => {
      const current = prev[screenId] || {
        screenName,
        screenId,
        access: false,
        crud: { create: false, update: false, delete: false },
      };

      const updatedActions = { ...prev };

      if (crudType === "access") {
        const isAccessing = !current.access;

        if (isAccessing) {
          // Se estiver acessando, adiciona de volta ao objeto
          updatedActions[screenId] = {
            screenName,
            screenId,
            access: true,
            crud: current.crud, // Mantém estado atual do CRUD
          };
        } else {
          // Se estiver desmarcando, remove a tela do objeto
          delete updatedActions[screenId];

          // Também remove todas as SubScreens relacionadas
          Object.keys(updatedActions).forEach((key) => {
            if (
              permissoesData.find((p) => p.id === key)?.parent_id === screenId
            ) {
              delete updatedActions[key];
            }
          });
        }
      } else if (current.access) {
        // Se "Acessar" estiver ativado, permite modificar CRUD normalmente
        updatedActions[screenId] = {
          ...current,
          crud: {
            ...current.crud,
            [crudType]: !current.crud[crudType],
          },
        };
      }

      return updatedActions;
    });
  }
  console.log("actions", actions);
  if (!permissoesData || permissoesData.length === 0) {
    return (
      <div className="text-primary-200 col-span-3">
        Por favor, selecione um tipo de usuário
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <PermissionsNavigationForm
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        permissionsData={permissoesData}
      >
        <ScreeConfig
          actions={actions}
          activeTab={activeTab}
          handleToggleCrud={handleToggleCrud}
          permissoesData={permissoesData}
        />
        <SubScreenConfig
          actions={actions}
          activeTab={activeTab}
          handleToggleCrud={handleToggleCrud}
          permissoesData={permissoesData}
        />
      </PermissionsNavigationForm>
    </div>
  );
}
