import { PlusCircle } from "lucide-react";

export default function AddButton() {
  return (
    <button className="bg-custom-green-700 flex cursor-pointer items-center 
    justify-between gap-1 self-start rounded-xl px-4 py-2 font-semibold text-white
    shadow-md  hover:bg-custom-green-800 transition-all scale-101 text-custom-green-100
    ">
      <PlusCircle className="size-5" />
      Novo
    </button>
  );
}
