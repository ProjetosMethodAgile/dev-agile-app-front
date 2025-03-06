import { Form } from "@/components/form";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { ArrowBigDownDash, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Screens from "./screen/PermissionsScreen";
import PermissionsScreen from "./screen/PermissionsScreen";
import PermissionsSubscreen from "./subscreen/PermissionsSubscreen";
import { useGlobalContext } from "@/context/globalContext";

type PermissionsMenuProps = {
  permissoesData: PermissaoCompletaData[];
};

export default function PermissionsMenu({
  permissoesData,
}: PermissionsMenuProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [screens, setScreens] = React.useState<PermissaoCompletaData[] | []>(
    () => {
      return permissoesData.filter((permissao) => permissao.parent_id === null);
    },
  );
  const [subScreens, seetSubScreens] = React.useState<
    PermissaoCompletaData[] | []
  >(() => {
    return permissoesData.filter((permissao) => permissao.parent_id !== null);
  });


  return (
    <div className="col-span-full">
      <PermissionsScreen
        screens={screens}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        subscreens={subScreens}
      />
    </div>
  );
}
