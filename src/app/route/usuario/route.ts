import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData, UsuarioData } from "@/types/api/apiTypes";

export async function GET() {
  const cookie = (await cookies()).get("token");

  if (!cookie) {
    return Response.json({ message: "Token não encontrado" }, { status: 401 });
  }

  const token = cookie.value;
  const usuarioData = jwt.decode(token) as TokenData | null;

  if (!usuarioData || !usuarioData.id) {
    return Response.json({ message: "Token inválido" }, { status: 400 });
  }

  const response = await fetch(
    `https://devagile.com.br/api/usuario/${usuarioData.id}`,
    {
      headers: {
        Authorization: "Barrer " + token,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    return Response.json({ data }, { status: 400 });
  }
  const usuario = (await response.json()) as UsuarioData;

  return Response.json(usuario);
}
