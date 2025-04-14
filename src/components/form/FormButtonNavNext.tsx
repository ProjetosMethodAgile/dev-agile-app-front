"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type FormButtonNavNextProps = React.ComponentProps<"button"> & {
  direction: "Continuar" | "Finalizar" | "Salvar";
  icon?: React.ElementType;
};

export default function FormButtonNavNext({
  direction,
  icon: Icon,
  ...props
}: FormButtonNavNextProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-primary-300 active:bg-primary-500 text-md focus-within:border-primary-600 hover:border-primary-600 hover:bg-primary-300/90 focus:bg-primary-300/90 shadow-primary-300/40 text-primary-50 col-start-3 flex cursor-pointer justify-between gap-2 self-end rounded-[12px] px-4 py-3 font-semibold transition-all outline-none focus-within:shadow-[0px_0px_2px_2px] hover:shadow-[0px_0px_2px_2px] disabled:cursor-not-allowed disabled:opacity-50"
      type="submit"
      disabled={pending} // Desativa o botão enquanto está carregando
      {...props}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={18} /> Criando...
        </div>
      ) : (
        <>
          {direction}
          {Icon && <Icon className="dark:text-gray-400" />}
        </>
      )}
    </button>
  );
}
