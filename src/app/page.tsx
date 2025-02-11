// app/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import { Form } from "@/components/form";
import { InputPatern } from "@/components/form/Input";

export default async function LoginPage() {
  const { data: user, ok } = await getUser();

  if (ok && user) {
    redirect("/home");
  }

  return (
    <main className="flex gap-3 justify-center items-center h-screen">
      <div>logo emp</div>
      <Form.Root>
        <InputPatern.Root text="email">
          <InputPatern.Input className="text-black" />
        </InputPatern.Root>
        <InputPatern.Root>
          <InputPatern.Input type="submit" className="bg-red-400 " />
        </InputPatern.Root>
      </Form.Root>
    </main>
  );
}
