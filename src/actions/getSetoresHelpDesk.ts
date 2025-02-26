"use server";

import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

export default async function getSetoresHelpDesk() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Token não encontrado.");
    console.log(token);
  } catch (error) {
    return apiError(error);
  }
}
