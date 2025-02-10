import { Login } from "@/types/api/apiTypes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email: string; senha: string };

  if (!body.email) {
    return NextResponse.json({ message: "Informe o email" }, { status: 400 });
  }

  if (!body.senha || body.senha.length === 0) {
    return NextResponse.json({ message: "Informe a senha" }, { status: 400 });
  }

  const response = await fetch("https://devagile.com.br/api/usuario/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: body.email,
      senha: body.senha,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: 400 });
  }

  const login: Login = await response.json();

  if (login.token) {
    (await cookies()).set("token", login.token, {
      httpOnly: true,
      secure: true,
    });
  }

  return NextResponse.json({ message: "Autenticação realizada com sucesso" });
}
