import { ChevronDown, ChevronRight, Lock } from "lucide-react";
import PermissionsSubscreen from "./PermissionsSubscreen";

import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { Form } from "@/components/form";
import { useState } from "react";

type SubScreenModalConfigProps = React.ComponentProps<"div"> & {
  screenId: string;
  subscreens: PermissaoCompletaData[];
  screenName: string;
};

export default function SubScreenConfig({
  screenId,
  subscreens,
  screenName,
  ...props
}: SubScreenModalConfigProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div {...props} className={`flex-col`}>
      <div className="border-primary-300/10 flex items-center border-b-2 text-xl font-bold">
        <Form.Checkbox
          label={screenName}
          checked={isChecked}
          id={screenId}
          onChange={() => setIsChecked(!isChecked)}
          name="checkbox[]"
        />
        {isChecked ? <ChevronDown /> : <ChevronRight />}
      </div>
      {isChecked &&
        subscreens.map((subscreen) => {
          return (
            <div
              key={subscreen.id}
              className={subscreen.parent_id === screenId ? "" : "hidden"}
            >
              <PermissionsSubscreen key={subscreen.id} subScreen={subscreen} />
            </div>
          );
        })}
    </div>
  );
}
