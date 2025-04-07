import { Form } from "@/components/form";
import { PermissoesRole } from "@/types/api/apiTypes";
import { PermissionsState } from "../PermissionsMenu";
import { ChevronDown } from "lucide-react";

type ScreenConfigProps = {
  permissoesData: PermissoesRole[];
  activeTab: string;
  actions: PermissionsState;
  handleToggleCrud: (screen_id: string, screenName: string, crudType: "create" | "update" | "delete" | "access") => void;
};

export default function ScreeConfig({ permissoesData, activeTab, actions, handleToggleCrud }: ScreenConfigProps) {
  return (
    <div>
      {permissoesData.map((screen) => {
        if (screen.parent_id === null && screen.id === activeTab) {
          const screenActions = actions[screen.id] || { access: false, crud: { create: false, update: false, delete: false } };

          return (
            <div
              className="border-primary-900 group bg-primary-900/70 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-2"
              key={screen.id}
            >
              <h3 className="cursor-pointer text-xl font-semibold transition-all group-hover:translate-x-2">
                {screen.nome}
              </h3>

              <div className="flex items-center gap-2">
                <Form.Checkbox
                  label="Acessar"
                  checked={screenActions.access}
                  onChange={() => handleToggleCrud(screen.id, screen.nome, "access")}
                  id={screen.id}
                  name="checkbox[]"
                  value={actions}
                />
                <Form.Checkbox
                  label="Criar"
                  checked={screenActions.crud.create}
                  onChange={() => handleToggleCrud(screen.id, screen.nome, "create")}
                  id={`${screen.id}-create`}
                  disabled={!screenActions.access}
                />
                <Form.Checkbox
                  label="Atualizar"
                  checked={screenActions.crud.update}
                  onChange={() => handleToggleCrud(screen.id, screen.nome, "update")}
                  id={`${screen.id}-update`}
                  disabled={!screenActions.access}
                />
                <Form.Checkbox
                  label="Deletar"
                  checked={screenActions.crud.delete}
                  onChange={() => handleToggleCrud(screen.id, screen.nome, "delete")}
                  id={`${screen.id}-delete`}
                  disabled={!screenActions.access}
                />
                <ChevronDown />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
