import { PermissaoCompletaData } from "@/types/api/apiTypes";
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
    <div className="flex gap-6 text-xl font-semibold *:cursor-pointer">
      {screens.map((screen) => {
        return (
          <button
            onClick={() => {
              handleCheckScreen(screen.id, screen.nome);
              setActiveTab(screen.nome);
            }}
            key={screen.id}
            type="button"
            className={`text-primary-50 flex cursor-pointer text-xl ${
              activeTab === screen.nome ? "border-b-2 text-white" : ""
            }`}
          >
            {screen.nome}
          </button>
        );
      })}
    </div>
  );
}
