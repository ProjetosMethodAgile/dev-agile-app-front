import React, { useState } from "react";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { Form } from "@/components/form";
import { EyeClosed, MoveUpRight, Save, SaveIcon, X } from "lucide-react";
import { useGlobalContext } from "@/context/globalContext";
import PermissionsSubscreen from "../subscreen/PermissionsSubscreen";
import SubScreenModalConfig from "../subscreen/SubScreenModalConfig";
import ScreenConfig from "./ScreenConfig";

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
  const { openGlobalModal, closeGlobalModal } = useGlobalContext();
  const [isChecked, setIsChecked] = useState<boolean>(false);


  function openSubscreensModal(screenId: string, screenName: string) {
    openGlobalModal(
      <SubScreenModalConfig
        screenId={screenId}
        screenName={screenName}
        subscreens={subscreens}
      />,
    );
  }

  return (
    <div className="border-primary-50/10 flex gap-3 pb-1 font-semibold *:cursor-pointer">
      <ScreenConfig  screens={screens} openSubscreensModal={openSubscreensModal}/>
    </div>
  );
}
