import { Form } from "@/components/form";
import { PermissoesRole } from "@/types/api/apiTypes";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PermissionsState } from "../PermissionsMenu";

type SubsScreenConfigProps = {
  permissoesData: PermissoesRole[];
  activeTab: string;
  actions: PermissionsState;
  handleClickScreen: (screen_id: string, screen_name: string) => void;
  handleToggleCrud: (
    screen_id: string,
    crudType: "create" | "update" | "delete" | "checked",
  ) => void;
};

export default function SubScreenConfig({
  permissoesData,
  activeTab,
  actions,
  handleClickScreen,
  handleToggleCrud,
}: SubsScreenConfigProps) {
  return (
    <div>
      {permissoesData.map((subScreen: PermissoesRole) => {
        if (
          subScreen.parent_id !== null &&
          subScreen.parent_id === activeTab &&
          actions[subScreen.parent_id]?.crud.checked
        ) {
          const action = actions[subScreen.id];

          return (
            <div
              key={subScreen.id}
              className="border-primary-600/40 group ml-4 border-b-2 py-2"
            >
              {/* Botão de alternar visibilidade */}
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => handleClickScreen(subScreen.id, subScreen.nome)}
              >
                <h1 className="transition-all group-hover:translate-x-1">
                  {subScreen.nome}
                </h1>
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
                    // value={action}
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
    </div>
  );
}
