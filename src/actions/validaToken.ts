"use server";

import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData, UsuarioData } from "@/types/api/apiTypes";
import logout from "./logout";

export async function validaToken() {
  try {
    const cookie = (await cookies()).get("token");
    if (!cookie) {
      return logout();
    }
    const token = cookie.value;
    const usuarioData = jwt.decode(token) as TokenData | null;
    if (!usuarioData || !usuarioData.id) {
      return logout();
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
      return logout();
    }

    const usuario = (await response.json()) as UsuarioData;
    return { data: usuario, ok: true };
  } catch (error) {
    return logout();
  }
}
