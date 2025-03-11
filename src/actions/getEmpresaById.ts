"use server";
import { GET_VERIFYPARAMETROS_EMPRESA } from "@/functions/api";

export default async function VALIDA_EMPRESA_POR_ID(id: string) {
  try {
    const { url } = await GET_VERIFYPARAMETROS_EMPRESA(id);
    const response = await fetch(url);
    return response.status;
  } catch (error) {
    console.error("Erro ao validar a empresa:", error);
    return 500;
  }
}
