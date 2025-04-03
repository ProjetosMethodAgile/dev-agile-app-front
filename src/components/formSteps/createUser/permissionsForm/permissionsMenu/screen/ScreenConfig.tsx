import { Form } from "@/components/form";
import { PermissoesRole } from "@/types/api/apiTypes";
import { PermissionsState } from "../PermissionsMenu";
import { ChevronDown, ChevronRight } from "lucide-react";

type ScreenConfigProps = {
  permissoesData: PermissoesRole[];
  activeTab: string;
  actions: PermissionsState;
  handleClickScreen: (screen_id: string, screen_name: string) => void;
  handleToggleCrud: (
    screen_id: string,
    crudType: "create" | "update" | "delete" | "checked",
  ) => void;
};

export default function ScreeConfig({
  permissoesData,
  activeTab,
  actions,
  handleClickScreen,
  handleToggleCrud,
}: ScreenConfigProps) {
  return (
    <div>
      {permissoesData.map((screen) => {
        const action = actions[screen.id];
        if (screen.parent_id === null && screen.id === activeTab) {
          return (
            <div
              className="border-primary-900 group bg-primary-900/70 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-2"
              key={screen.id}
              onClick={() => handleClickScreen(screen.id, screen.nome)}
            >
              <h3
                className={`cursor-pointer text-xl font-semibold transition-all group-hover:translate-x-2`}
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
                    // value={action}
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
    </div>
  );
}
