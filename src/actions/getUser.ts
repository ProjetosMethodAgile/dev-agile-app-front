"use server";

import apiError from "@/functions/api-error";
import { TokenData, UsuarioData } from "@/types/api/apiTypes";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookie = (await cookies()).get("token");

  if (!cookie) {
    return apiError("token invalido");
  }
  const token = cookie.value;

  const usuarioData = jwt.decode(token) as TokenData | null;

  if (!usuarioData || !usuarioData.id) {
    return apiError("token invalido");
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
    return apiError(data.message);
  }

  const usuario = (await response.json()) as UsuarioData;

  return { data: usuario, ok: true };
}
