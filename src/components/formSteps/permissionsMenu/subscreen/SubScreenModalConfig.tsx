import { Form } from "@/components/form";
import PermissionsSubscreen from "./PermissionsSubscreen";
import { useGlobalContext } from "@/context/globalContext";
import { SaveIcon, X } from "lucide-react";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { useState } from "react";

type SubScreenModalConfigProps = {
  screenName: string;
  screenId: string;
  subscreens: PermissaoCompletaData[];
};

export default function SubScreenModalConfig({
  screenName,
  screenId,
  subscreens,
}: SubScreenModalConfigProps) {
  const { closeGlobalModal } = useGlobalContext();
  
  return (
    <div className="bg-primary-900 flex min-w-3xl flex-col rounded-xl p-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{screenName}</h2>
        <X className="cursor-pointer" onClick={() => closeGlobalModal()} />
      </div>
      {subscreens.map((subscreen) => {
        if (subscreen.parent_id === screenId)
          return (
            <PermissionsSubscreen key={subscreen.id} subScreen={subscreen} />
          );
      })}
      <Form.ButtonNext
        onClick={() => closeGlobalModal()}
        type="button"
        direction="Salvar"
        icon={SaveIcon}
      />
    </div>
  );
}
