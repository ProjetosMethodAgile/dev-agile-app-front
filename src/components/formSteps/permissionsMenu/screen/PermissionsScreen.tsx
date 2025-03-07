import React, { JSX, useState } from "react";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import SubScreenConfig from "../subscreen/SubScreenConfig";
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
  const [currentSubscreen, setCurrentSubscreen] = useState<JSX.Element | null>(
    null,
  );

  function handleCheckScreen(screenId: string, screenName: string) {
    setCurrentSubscreen(
      <SubScreenConfig
        screenId={screenId}
        screenName={screenName}
        subscreens={subscreens}
      />,
    );
  }

  return (
    <div className="border-primary-50/10 flex flex-col gap-3 pb-1 font-semibold *:cursor-pointer">
      <ScreenConfig screens={screens} handleCheckScreen={handleCheckScreen} />
      {currentSubscreen}
    </div>
  );
}
