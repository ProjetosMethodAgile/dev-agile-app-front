import { Form } from "@/components/form";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import React, { useState } from "react";

type PermissionsSubScreenProps = {
  subScreen: PermissaoCompletaData;
  activeTab?: string;
};

type PermissionsKeys = "checked" | "create" | "read" | "update" | "delete";

type PermissionsState = {
  [key: string]: {
    checked: boolean;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
};

function PermissionsSubscreen({
  subScreen,
  // activeTab,
}: PermissionsSubScreenProps) {
  const permissoesIniciais = {
    [subScreen.nome]: {
      checked: false,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  };

  const [permissions, setPermissions] =
    useState<PermissionsState>(permissoesIniciais);

  function handleCheckboxChange(permissionType: PermissionsKeys) {
    setPermissions((prev) => {
      const updated = {
        ...prev,
        [subScreen.nome]: {
          ...prev[subScreen.nome],
          [permissionType]: !(prev[subScreen.nome]?.[permissionType] ?? false),
        },
      };
      return updated;
    });
  }

  return (
    <div
      key={subScreen.id}
      className="group text-primary-50 border-primary-600/50 my-2 flex flex-col border-b-1 px-6 pb-2 text-lg"
    >
      <h3 className="mb-1 flex items-center space-x-2 font-medium">
        <Form.Checkbox
          checked={permissions[subScreen.nome].checked}
          onChange={() => handleCheckboxChange("checked")}
          label={subScreen.nome}
          id={subScreen.id}
          name="checkbox[]"
          // value={{ subScreen, permissions }}
        />
      </h3>
      {permissions[subScreen.nome].checked && (
        <div className="ml-4 flex space-x-5 transition-all">
          {(["create", "read", "update", "delete"] as PermissionsKeys[]).map(
            (perm) => (
              <Form.Checkbox
                key={perm}
                checked={permissions[subScreen.nome][perm]}
                onChange={() => handleCheckboxChange(perm)}
                label={perm.charAt(0).toUpperCase() + perm.slice(1)}
                id={`${subScreen.id}-${perm}`}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default PermissionsSubscreen;
