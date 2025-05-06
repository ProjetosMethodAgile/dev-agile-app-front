"use client";

import { useGlobalContext } from "@/context/globalContext";
import { PermissionsState } from "../PermissionsMenu";
import { Check, X } from "lucide-react";
import React from "react";

type CurrentScreensProps = {
  currentScreen: PermissionsState;
};

export default function CurrentScreens({ currentScreen }: CurrentScreensProps) {
  const {closeGlobalModal} = useGlobalContext();


  // Separar telas pai e subtelas
  const screens = Object.entries(currentScreen);
  const telasPai = screens.filter(([_, data]) => data.parent_id === null);
  const subtelas = screens.filter(([_, data]) => data.parent_id !== null);

  // Agrupar subtelas por parent_id
  const subtelasPorPai: { [parentId: string]: typeof subtelas } = {};
  subtelas.forEach(([id, data]) => {
    if (!subtelasPorPai[data.parent_id!]) {
      subtelasPorPai[data.parent_id!] = [];
    }
    subtelasPorPai[data.parent_id!].push([id, data]);
  });

  return (
    <footer className="bg-primary-900 min-w-xl rounded-2xl p-4">
      <div className="flex justify-between">
        <h5 className="mb-2 text-center font-semibold">Telas Liberadas</h5>
        <X className="cursor-pointer" onClick={()=> closeGlobalModal()

        } />
      </div>
      <div className="flex flex-col gap-2">
        {telasPai.map(([id, data]) => (
          <div key={id}>
            <div className="text-primary-50 text-l flex items-center gap-2 font-semibold">
              <Check size={20} color="green" />
              {data.screenName}
            </div>
            <ul className="text-md text-primary-50/80 mt-1 ml-6">
              {subtelasPorPai[id]?.map(([subId, subData]) => (
                <li key={subId} className="flex items-center gap-2">
                  {" "}
                  <Check size={15} color="green" />
                  {subData.screenName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
