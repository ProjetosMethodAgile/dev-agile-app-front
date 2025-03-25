import { PermissaoCompletaData } from "@/types/api/apiTypes";
import React, { useState } from "react";
import PermissionsNavigationForm from "../permissionsForm/layout";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Form } from "@/components/form";

type PermissionsMenuProps = {
  permissoesData: PermissaoCompletaData[];
};

type PermissionsState = {
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
        {permissoesData.map((screen) => {
          const action = actions[screen.id];
          if (screen.parent_id === null && screen.id === activeTab) {
            return (
              <div
                className="border-primary-900 bg-primary-900/70 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-2"
                key={screen.id}
                onClick={() => handleClickScreen(screen.id, screen.nome)}
              >
                <h3
                  className={`} cursor-pointer text-xl font-semibold`}
                  key={screen.nome}
                >
                  {screen.nome}
                </h3>
                {action ? (
                  <div className="flex items-center gap-2">
                    <Form.Checkbox
                      label="Acessar"
                      checked={action.crud.checked}
                      onChange={() => handleToggleCrud(screen.id, "checked")}
                      id={screen.id}
                      name="checkbox[]"
                      value={action}
                    />
                    <Form.Checkbox
                      label={action.crud.create.name}
                      checked={action.crud.create.status}
                      onChange={() => handleToggleCrud(screen.id, "create")}
                      id={screen.id + "-" + action.crud.create.name}
                      disabled={!action.crud.checked}
                    />
                    <Form.Checkbox
                      label={action.crud.update.name}
                      checked={action.crud.update.status}
                      onChange={() => handleToggleCrud(screen.id, "update")}
                      id={screen.id + "-" + action.crud.update.name}
                      disabled={!action.crud.checked}
                    />
                    <Form.Checkbox
                      label={action.crud.delete.name}
                      checked={action.crud.delete.status}
                      onChange={() => handleToggleCrud(screen.id, "delete")}
                      id={screen.id + "-" + action.crud.delete.name}
                      disabled={!action.crud.checked}
                    />
                    <ChevronDown />
                  </div>
                ) : (
                  <ChevronRight />
                )}
              </div>
            );
          }
          return null;
        })}

        {permissoesData.map((subScreen) => {
          if (
            subScreen.parent_id !== null &&
            subScreen.parent_id === activeTab &&
            actions[subScreen.parent_id]?.crud.checked
          ) {
            const action = actions[subScreen.id];

            return (
              <div
                key={subScreen.id}
                className="border-primary-600/40 ml-4 border-b-2 py-2"
              >
                {/* Botão de alternar visibilidade */}
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    handleClickScreen(subScreen.id, subScreen.nome)
                  }
                >
                  {subScreen.nome}
                  {action?.isVisible ? <ChevronDown /> : <ChevronRight />}
                </div>

                {/* Exibir checkboxes se visível */}
                {action?.isVisible && (
                  <div className="ml-4 flex gap-2">
                    <Form.Checkbox
                      label="Acessar"
                      checked={action.crud.checked}
                      onChange={() => handleToggleCrud(subScreen.id, "checked")}
                      id={subScreen.id}
                      name="checkbox[]"
                      value={action}
                    />
                    <Form.Checkbox
                      label={action.crud.create.name}
                      checked={action.crud.create.status}
                      onChange={() => handleToggleCrud(subScreen.id, "create")}
                      id={subScreen.id + "-" + action.crud.create.name}
                      disabled={!action.crud.checked}
                    />
                    <Form.Checkbox
                      label={action.crud.update.name}
                      checked={action.crud.update.status}
                      onChange={() => handleToggleCrud(subScreen.id, "update")}
                      id={subScreen.id + "-" + action.crud.update.name}
                      disabled={!action.crud.checked}
                    />
                    <Form.Checkbox
                      label={action.crud.delete.name}
                      checked={action.crud.delete.status}
                      onChange={() => handleToggleCrud(subScreen.id, "delete")}
                      id={subScreen.id + "-" + action.crud.delete.name}
                      disabled={!action.crud.checked}
                    />
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </PermissionsNavigationForm>
    </div>
  );
}
