import { PermissaoCompletaData, PermissoesRole } from "@/types/api/apiTypes";
import React, { useState } from "react";
import PermissionsNavigationForm from "../layout";
import ScreeConfig from "./screen/ScreenConfig";
import SubScreenConfig from "./subscreen/SubScreenConfig";

type PermissionsMenuProps = {
  permissoesData: PermissoesRole[];
  isEditMode?: boolean;
  defaultValues: PermissaoCompletaData[] | undefined;
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
  isEditMode = false,
  defaultValues,
}: PermissionsMenuProps) {
  const [activeTab, setActiveTab] = useState("informacoes");
  const [actions, setActions] = useState<PermissionsState>(() => {
    if (isEditMode && defaultValues) {
      const initialState: PermissionsState = {};

      defaultValues.forEach((item) => {
        // Adiciona permissão da tela principal
        initialState[item.id] = {
          screenId: item.id,
          screenName: item.descricao,
          access: item.acessos.can_read,
          crud: {
            create: item.acessos.can_create,
            update: item.acessos.can_update,
            delete: item.acessos.can_delete,
          },
        };

        // Adiciona permissões das sub-telas
        item.subpermissoes?.forEach((subItem) => {
          initialState[subItem.id] = {
            screenId: subItem.id,
            screenName: subItem.descricao,
            access: subItem.acessos.can_read,
            crud: {
              create: subItem.acessos.can_create,
              update: subItem.acessos.can_update,
              delete: subItem.acessos.can_delete,
            },
          };
        });
      });

      return initialState;
    }

    return {};
  });
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
