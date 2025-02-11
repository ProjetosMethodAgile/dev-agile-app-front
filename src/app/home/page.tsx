import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import logout from "@/actions/logout";

export default async function HomePage() {
  // Verifica se o usuário está autenticado
  const { data: user, ok } = await getUser();
  if (!ok || !user) {
    redirect("/");
  }

  return (
    <main className="p-6">
      <h1>Bem-vindo, {user.usuario.nome}</h1>
      <form action={logout}>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </main>
  );
}
