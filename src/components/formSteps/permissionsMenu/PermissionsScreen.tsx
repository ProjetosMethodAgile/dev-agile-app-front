import React, { useState } from "react";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { Form } from "@/components/form";
import { EyeClosed, MoveUpRight, Save, SaveIcon, X } from "lucide-react";
import { useGlobalContext } from "@/context/globalContext";
import PermissionsSubscreen from "./PermissionsSubscreen";

type PermissionsScreenProps = {
  screens: PermissaoCompletaData[];
  subscreens: PermissaoCompletaData[];
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

export default function PermissionsScreen({
  screens,
  subscreens,
}: PermissionsScreenProps) {
  const { openGlobalModal, closeGlobalModal} = useGlobalContext();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function addScreenToProfile(screen: PermissaoCompletaData) {
    setIsChecked(!isChecked);
  }

  function openSubscreensModal(screenId: string, screenName: string) {
    openGlobalModal(
      <div className="bg-primary-900 flex min-w-3xl flex-col rounded-xl p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{screenName}</h2>
          <X className="cursor-pointer" onClick={() => closeGlobalModal()} />
        </div>
        {subscreens.map((subscreen) => {
          if (subscreen.parent_id === screenId)
            return <PermissionsSubscreen subScreen={subscreen} />;
        })}
        <Form.ButtonNext
          onClick={() => closeGlobalModal()}
          type="button"
          direction="Salvar"
          icon={SaveIcon}
        />
      </div>,
    );
  }

  return (
    <nav className="border-primary-50/10 flex gap-3 pb-1 font-semibold *:cursor-pointer">
      {screens.map((screen) => {
        return (
          <button key={screen.id} type="button" className="text-x flex">
            <Form.Checkbox
              onChange={()=> addScreenToProfile(screen)}
              label={screen.nome}
              id={screen.id}
              name="checkbox[]"
              screen={screen}
            />
            <MoveUpRight
              onClick={() => openSubscreensModal(screen.id, screen.nome)}
              className="hover:border-primary-100 text-primary-100 size-5 rounded-full border-2 border-transparent p-0.5 transition-all"
            />
          </button>
        );
      })}
    </nav>
  );
}
