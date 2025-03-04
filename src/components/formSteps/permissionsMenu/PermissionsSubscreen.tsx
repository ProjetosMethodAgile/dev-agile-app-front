import { Form } from "@/components/form";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

type PermissionsSubScreenProps = {
  subScreen: PermissaoCompletaData;
  activeTab?: string;
};

function PermissionsSubscreen({
  subScreen,
  activeTab,
}: PermissionsSubScreenProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function permissionsInThisScreen(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  return (
    <div
      key={subScreen.id}
      className="group border-primary-600/50 my-2 flex flex-col border-b-1 pb-2 text-lg"
    >
      <h3 className="mb-1 flex items-center space-x-2 font-medium">
        <Form.Checkbox
          onChange={permissionsInThisScreen}
          label={subScreen.nome}
          id={subScreen.id}
          name="checkbox[]"
        />
      </h3>
      {isChecked && (
        <div className="ml-4 flex space-x-5 text-gray-600 transition-all">
          <Form.Checkbox label="Criar" id="create" />
          <Form.Checkbox label="Ler" id="read" />
          <Form.Checkbox label="Atualizar" id="update" />
          <Form.Checkbox label="Deletar" id="delete" />
        </div>
      )}
    </div>
  );
}

export default PermissionsSubscreen;
