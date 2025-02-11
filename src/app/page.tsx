// app/page.tsx
import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import { Form } from "@/components/form";

export default async function LoginPage() {
  const { data: user, ok } = await getUser();

  if (ok && user) {
    redirect("/home");
  }

  return (
    <main className="flex gap-3 justify-center items-center h-screen">
      <div>logo emp</div>
      <Form.Root>
        <Form.Input text="dadsad" />
        <Form.Button className="bg-red-400">hgasjhdagsjhd</Form.Button>
        <Form.Button>teste2</Form.Button>
        <Form.Input text="dadsad" />
        <Form.Input text="dadsad" />
      </Form.Root>

      <Form.Root>
        <Form.Input text="dadsad" />
      </Form.Root>
    </main>
  );
}
