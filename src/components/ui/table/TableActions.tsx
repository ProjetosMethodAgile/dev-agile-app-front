import deleteUser from "@/actions/deleteUser";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TableActions() {

  const pathname = usePathname();

  return (
    <td className="flex justify-center space-x-4 px-6 py-4 *:p-1">
      <button className="dark:text-primary-50 text-primary-150 hover:text-primary-200 cursor-pointer">
        <Link href={`${pathname}/criar`}>
          <Pencil size={19} />
        </Link>
      </button>
      <button onClick={()=> deleteUser('221d16ca-4992-400f-949e-02f8fb3d8902')} className="cursor-pointer text-red-500 hover:text-red-700">
        <Trash2 size={19} />
      </button>
    </td>
  );
}
