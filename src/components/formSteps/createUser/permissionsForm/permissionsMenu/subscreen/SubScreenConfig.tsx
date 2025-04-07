import { Form } from "@/components/form";
import { PermissaoCompletaData, PermissoesRole } from "@/types/api/apiTypes";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PermissionsState } from "../PermissionsMenu";

type SubsScreenConfigProps = {
  permissoesData: PermissoesRole[];
  activeTab: string;
  actions: PermissionsState;
  handleToggleCrud: (
    screen_id: string,
    parent_id: string,
    crudType: "create" | "update" | "delete" | "access"
  ) => void;
};

export default function SubScreenConfig({
  permissoesData,
  activeTab,
  actions,
  handleToggleCrud,
}: SubsScreenConfigProps) {
  return (
    <div>
      {permissoesData.map((subScreen: PermissoesRole) => {
        const parentAccess = actions[subScreen.parent_id]?.access ?? false;
        if (subScreen.parent_id !== null && subScreen.parent_id === activeTab && parentAccess) {
          const action = actions[subScreen.id] || { access: false, crud: { create: false, update: false, delete: false } };
          return (
            <div key={subScreen.id} className="border-primary-600/40 group ml-4 border-b-2 py-2">
              <div className="flex cursor-pointer items-center gap-2">
                <h1 className="transition-all group-hover:translate-x-1">
                  {subScreen.nome}
                </h1>
                {action?.access ? <ChevronDown /> : <ChevronRight />}
              </div>

              <div className="ml-4 flex gap-2">
                <Form.Checkbox
                  label="Acessar"
                  checked={action.access}
                  onChange={() => handleToggleCrud(subScreen.id, subScreen.nome + '- Subscreen', "access")}
                  id={subScreen.id}
                />
                <Form.Checkbox
                  label="Criar"
                  checked={action.crud.create}
                  onChange={() => handleToggleCrud(subScreen.id, subScreen.nome + '- Subscreen', "create")}
                  id={`${subScreen.id}-create`}
                  disabled={!action.access}
                />
                <Form.Checkbox
                  label="Atualizar"
                  checked={action.crud.update}
                  onChange={() => handleToggleCrud(subScreen.id, subScreen.nome + '- Subscreen', "update")}
                  id={`${subScreen.id}-update`}
                  disabled={!action.access}
                />
                <Form.Checkbox
                  label="Deletar"
                  checked={action.crud.delete}
                  onChange={() => handleToggleCrud(subScreen.id, subScreen.nome + '- Subscreen', "delete")}
                  id={`${subScreen.id}-delete`}
                  disabled={!action.access}
                />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
