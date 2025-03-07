import PermissionsSubscreen from "./PermissionsSubscreen";
import { X } from "lucide-react";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { useState } from "react";

type SubScreenModalConfigProps = {
  screenName: string;
  screenId: string;
  subscreens: PermissaoCompletaData[];
};

export default function SubScreenConfig({
  screenName,
  screenId,
  subscreens,
}: SubScreenModalConfigProps) {
  return (
    <div className="flex  flex-col  px-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{screenName}</h2>
      </div>
      {subscreens.map((subscreen) => {
        if (subscreen.parent_id === screenId)
          return (
            <PermissionsSubscreen key={subscreen.id} subScreen={subscreen} />
          );
      })}
    </div>
  );
}
