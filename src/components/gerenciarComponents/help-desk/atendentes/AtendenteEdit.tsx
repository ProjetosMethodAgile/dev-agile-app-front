import { ativaAtendenteHelpdesk } from "@/actions/HelpDesk/ativaAtendenteHelpDesk";
import { inativaAtendenteHelpdesk } from "@/actions/HelpDesk/deleteAtendenteHelpdesk";
import { useState } from "react";
import { toast } from "react-toastify";

interface AtendenteEditProps {
    atendenteID: string;
    atendenteNome: string;
    setModalAtendenteEdit: (open: boolean) => void;
  }
  
  export default function AtendenteEdit({
    atendenteID,
    atendenteNome,
    setModalAtendenteEdit,
  }: AtendenteEditProps) {
    const [ativaToggle, setAtivaToggle] = useState(true);
  
    async function handleDeletAttendant(id: string) {
      const response = await inativaAtendenteHelpdesk(id);
      toast.success(response.message);
    }
  
    async function handleAtiveAttendant(id: string) {
      const response = await ativaAtendenteHelpdesk(id);
      toast.success(response.message);
    }
  
    function toggleStatus() {
      const novo = !ativaToggle;
      setAtivaToggle(novo);
      if (!novo) handleDeletAttendant(atendenteID);
      else       handleAtiveAttendant(atendenteID);
    }
  
    return (
      <div className="dark:border-primary-600/70 border-primary-300 bg-white hover:bg-primary-200/50 my-1 flex items-center justify-between rounded-md border p-2 transition-all">
        <button
          aria-label="Fechar Modal"
          className="size-10 cursor-pointer active:scale-95"
          onClick={() => setModalAtendenteEdit(false)}
        >
    
        </button>
  
        <div className="flex-1 px-4">
          <div>
            <span className="font-medium">Nome:</span>
            <span className="ml-1">{atendenteNome}</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            <span className="font-medium">ID:</span>
            <span className="ml-1">{atendenteID}</span>
          </div>
        </div>
  
        <div
          onClick={toggleStatus}
          className={`
            relative w-16 h-8 flex items-center p-1 rounded-full cursor-pointer
            ${ativaToggle ? "bg-green-500" : "bg-red-500"}
            transition-colors duration-200
          `}
        >
          <div
            className={`
              w-6 h-6 bg-white rounded-full shadow transform duration-200
              ${ativaToggle ? "translate-x-8" : "translate-x-0"}
            `}
          />
  
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
  
          </div>
        </div>
      </div>
    );
  }
  