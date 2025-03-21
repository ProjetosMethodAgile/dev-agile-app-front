import { PermissaoCompletaData } from "@/types/api/apiTypes";
import React, { useEffect, useState } from "react";
import { Form } from "@/components/form";

type PermissionsMenuProps = {
  permissoesData: PermissaoCompletaData[];
};

export default function PermissionsMenu({ permissoesData }: PermissionsMenuProps) {
  const [activeTab, setActiveTab] = useState("451da5b2-32fc-4582-affa-27f2becfb918")

  // Estados para armazenar as permissões
  const [screens, setScreens] = useState<PermissaoCompletaData[]>(() => {
    return permissoesData
      .filter((permissao) => permissao.parent_id === null)
      .map((screen) => ({
        ...screen,
        crud: { create: false, read: false, update: false, delete: false },
      }));
  });

  const [subScreens, setSubScreens] = useState<PermissaoCompletaData[]>(() => {
    return permissoesData
      .filter((permissao) => permissao.parent_id !== null)
      .map((subScreen) => ({
        ...subScreen,
        crud: { create: false, read: false, update: false, delete: false },
      }));
  });

  // Função para atualizar o estado ao alterar os checkboxes
  const handleCheckboxChange = (
    id: string,
    type: "create" | "read" | "update" | "delete",
    isSubScreen = false
  ) => {
    if (isSubScreen) {
      setSubScreens((prev) =>
        prev.map((subscreen) =>
          subscreen.id === id
            ? { ...subscreen, crud: { ...subscreen.crud, [type]: !subscreen.crud[type] } }
            : subscreen
        )
      );
    } else {
      setScreens((prev) =>
        prev.map((screen) =>
          screen.id === id
            ? { ...screen, crud: { ...screen.crud, [type]: !screen.crud[type] } }
            : screen
        )
      );
    }
  };



  return (
    <div className="col-span-ful flex">
      {screens.map((screen) => (
    
        <div key={screen.id}  className="">
          <Form.Checkbox
                key={`${screen.id}`}
                id={`${screen.id}`}
                label={screen.nome}
                checked={screen.crud.read}
                onChange={() => {setActiveTab(screen.id); handleCheckboxChange(screen.id, "read")}}
                name="checkbox[]"
                value={screen}
            />
          <div className={`flex ${activeTab === screen.id ? "" : "hidden"}`} >
            {["criar", "atualizar", "deletar"].map((type) => (
              <Form.Checkbox
                key={`${type}-${screen.id}`}
                id={`${type}-${screen.id}`}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                checked={screen.crud[type]}
                onChange={() => handleCheckboxChange(screen.id, type)}
                name="checkbox[]"
                value={screen}
              />
            ))}
          </div>

          <div className="ml-4 mt-2">
            {subScreens
              .filter((subscreen) => subscreen.parent_id === screen.id)
              .map((subscreen) => (
                <div key={subscreen.id} className="text-green-300 flex flex-col">
                  <Form.Checkbox
                    key={`${subscreen.id}`}
                    id={`${subscreen.id}`}
                    label={subscreen.nome}
                    checked={subscreen.crud.read}
                    onChange={() => {setActiveTab(screen.id); handleCheckboxChange(screen.id, "read")}}
                    name="checkbox[]"
                    value={screen}
                />
                  <div className="flex">
                    {["criar","atualizar", "deletar"].map((type) => (
                      <Form.Checkbox
                        key={`${type}-${subscreen.id}`}
                        id={`${type}-${subscreen.id}`}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                        checked={subscreen.crud[type]}
                        onChange={() => handleCheckboxChange(subscreen.id, type, true)}
                        name="checkbox[]"
                        value={subscreen}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
