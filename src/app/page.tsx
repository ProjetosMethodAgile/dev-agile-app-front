// app/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import FormComponent from "@/components/form/form";

export default async function LoginPage() {
  const { data: user, ok } = await getUser();

  if (ok && user) {
    redirect("/home");
  }

  return (
    <main className="flex gap-3 justify-center items-center h-screen">
      <div>logo emp</div>
      <FormComponent />
    </main>
  );
}
