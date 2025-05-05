import { useGlobalContext } from "@/context/globalContext";
import { useUser } from "@/context/userContext";
import { User } from "@/types/api/apiTypes";
import { Check, Lock, Puzzle, RotateCcw, Send, X } from "lucide-react";
import SectionTitle from "../titles/SectionTitle";
import { Form } from "../form";
import { Button } from "@material-tailwind/react";
import RedirectButton from "../ui/button/RedirectButton";

export default function ActionsMenuUserCard({ user }: { user: User }) {
  const { openGlobalModal } = useGlobalContext();

  const showRedefinePasswordModal = () => {
    openGlobalModal(
      <div className="mirror-container flex flex-col gap-2 p-4">
        <SectionTitle title="Redefinir Senha" className="mb-2" />
        <p className="flex flex-col items-center gap-2">
          Ao redefinir a senha deste usuario, uma nova senha será enviada para o
          email:{" "}
          <span className="bg-primary-600 rounded-2xl p-2 text-2xl font-bold">
            {user.email}
          </span>
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-50">Deseja mesmo redefinir a senha?</p>
          <div className="flex items-center justify-between gap-2">
            <RedirectButton icon={Send} text="Enviar Senha" route="/" />
            <RedirectButton icon={X} text="Cancelar" secondary route="/" />
          </div>
        </div>
      </div>,
    );
  };

  return (
    <ul className="*:font-sm *:hover:bg-primary-150 border-primary-600 bg-primary-600/90 absolute top-0 right-0 flex w-50 flex-col gap-2 rounded-2xl p-2 pr-6 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-2xl *:p-1 *:text-xs">
      <li onClick={showRedefinePasswordModal}>
        <Lock className="bg-primary-500 rounded-full p-1" /> Redefinir Senha
      </li>
      <li>
        <Puzzle className="bg-primary-500 rounded-full p-1" /> Outra Opção
      </li>
    </ul>
  );
}
