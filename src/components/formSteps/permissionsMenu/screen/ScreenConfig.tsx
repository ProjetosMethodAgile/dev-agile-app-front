import { Form } from "@/components/form";
import { useGlobalContext } from "@/context/globalContext";
import { PermissaoCompletaData } from "@/types/api/apiTypes";
import { MoveUpRight } from "lucide-react";

type ScreenConfigProps = {
  screens: PermissaoCompletaData[];
  openSubscreensModal: (screenId: string, screenName: string) => void;
};

export default function ScreenConfig({
  screens,
  openSubscreensModal,
}: ScreenConfigProps) {
  return (
    <div className="border-primary-50/10 flex gap-3 pb-1 font-semibold *:cursor-pointer">
      {screens.map((screen) => {
        return (
          <button key={screen.id} type="button" className="text-x flex">
            <Form.Checkbox
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
    </div>
  );
}
