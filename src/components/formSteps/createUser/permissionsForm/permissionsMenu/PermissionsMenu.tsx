import { PermissaoCompletaData } from "@/types/api/apiTypes";
import React, { useState } from "react";
import PermissionsNavigationForm from "../layout";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Form } from "@/components/form";
import SubScreenConfig from "./subscreen/SubScreenConfig";
import ScreeConfig from "./screen/ScreenConfig";

type PermissionsMenuProps = {
  permissoesData: PermissaoCompletaData[];
};

export type PermissionsState = {
  [screen_id: string]: {
    screen_id: string;
    screen_name: string;
    isVisible: boolean;
    crud: {
      checked: boolean;
      create: { name: string; status: boolean };
      update: { name: string; status: boolean };
      delete: { name: string; status: boolean };
    };
  };
};

export default function PermissionsMenu({
  permissoesData,
}: PermissionsMenuProps) {
  const [activeTab, setActiveTab] = useState("informacoes");
  const [actions, setActions] = useState<PermissionsState>({});

  // Alternar visibilidade e ativar "Acessar"
  function handleClickScreen(screen_id: string, screen_name: string) {
    setActions((prev) => ({
      ...prev,
      [screen_id]: prev[screen_id]
        ? {
            ...prev[screen_id],
            isVisible: !prev[screen_id].isVisible,
          }
        : {
            screen_id,
            screen_name,
            isVisible: true,
            crud: {
              checked: false, // Ao abrir, "Acessar" já fica marcado
              create: { name: "Criar", status: false },
              update: { name: "Atualizar", status: false },
              delete: { name: "Deletar", status: false },
            },
          },
    }));
  }

  // Alternar estados dos checkboxes de CRUD
  function handleToggleCrud(
    screen_id: string,
    crudType: "create" | "update" | "delete" | "checked",
  ) {
    setActions((prev) => {
      if (!prev[screen_id]) return prev;

      if (crudType === "checked") {
        return {
          ...prev,
          [screen_id]: {
            ...prev[screen_id],
            crud: {
              ...prev[screen_id].crud,
              checked: !prev[screen_id].crud.checked, // Alteração para "Acessar"
            },
          },
        };
      }

      return {
        ...prev,
        [screen_id]: {
          ...prev[screen_id],
          crud: {
            ...prev[screen_id].crud,
            [crudType]: {
              ...prev[screen_id].crud[crudType],
              status: !prev[screen_id].crud[crudType].status,
            },
          },
        },
      };
    });
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
          handleClickScreen={handleClickScreen}
          handleToggleCrud={handleToggleCrud}
          permissoesData={permissoesData}
        />
        <SubScreenConfig
          actions={actions}
          activeTab={activeTab}
          handleClickScreen={handleClickScreen}
          handleToggleCrud={handleToggleCrud}
          permissoesData={permissoesData}
        />
      </PermissionsNavigationForm>
    </div>
  );
}
