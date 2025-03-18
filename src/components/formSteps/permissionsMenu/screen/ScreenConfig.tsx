import { Form } from "@/components/form";
import { useGlobalContext } from "@/context/globalContext";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { MoveUpRight } from "lucide-react";
import SubScreenConfig from "../subscreen/SubScreenConfig";
import { useState } from "react";

type ScreenConfigProps = {
  screens: PermissaoCompletaData[];

  handleCheckScreen: (screenId: string, screenName: string) => void;
};

export default function ScreenConfig({
  screens,
  handleCheckScreen,
}: ScreenConfigProps) {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className=" flex gap-6 text-xl font-semibold *:cursor-pointer">
      {screens.map((screen) => {
        return (
          <button
            onClick={() => {
              handleCheckScreen(screen.id, screen.nome);
              setActiveTab(screen.nome);
            }}

            key={screen.id}
            type="button"
            className={`text-xl text-primary-50 flex cursor-pointer ${
              activeTab === screen.nome ? "text-white border-b-2" : ""
            }`}
          >
            {screen.nome}
          </button>
        );
      })}
    </div>
  );
}
