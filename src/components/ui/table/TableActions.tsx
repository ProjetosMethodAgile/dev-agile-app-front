/* import deleteUser from "@/actions/deleteUser";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function TableActions({ dataId }: { dataId: string | number }) {
  const pathname = usePathname();

  function handleDelete(dataId: string | number) {
    async function deleteData() {
      const data = await deleteUser(dataId);
      console.log(data);
      if (!data.success) {
        data?.errors.forEach((erro: string) => {
          toast.error(erro);
        });
        return;
      }

      toast.success(data.msg_success)

    }

    deleteData();
  }

  return (
    <td className="flex justify-center space-x-4 px-6 py-4 *:p-1">
      <button className="dark:text-primary-50 text-primary-150 hover:text-primary-200 cursor-pointer">
        <Link href={`${pathname}/criar`}>
          <Pencil size={19} />
        </Link>
      </button>
      <button
        onClick={() => handleDelete(dataId)}
        className="cursor-pointer text-red-500 hover:text-red-700"
      >
        <Trash2 size={19} />
      </button>
    </td>
  );
}
 */