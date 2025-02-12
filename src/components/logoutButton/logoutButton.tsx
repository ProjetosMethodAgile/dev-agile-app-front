"use client";

import logout from "@/actions/logout";
import { useParams } from "next/navigation";

export default function LogoutButton() {
  const { empresaTag } = useParams();

  const handleLogout = () => {
    if (typeof empresaTag !== "string") {
      return;
    }
    logout(empresaTag);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
