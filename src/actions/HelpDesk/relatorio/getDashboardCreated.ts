"use server";

import { cookies } from "next/headers";

import { ApiResult, CreatedCard } from "@/types/api/apiTypes";
import { GET_DASHBOARD_CREATED } from "@/functions/api";

export default async function getDashboardCreated(
  date: string,
): Promise<ApiResult<CreatedCard[]>> {
  const token = (await cookies()).get("token")?.value;

  if (!token) throw new Error("Token não encontrado");

  // monta a URL: GET_DASHBOARD_CREATED deve usar query date
  const { url } = GET_DASHBOARD_CREATED(new URLSearchParams({ date }));
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: {
      revalidate: 60,
      tags: ["dash-helpdesk"],
    },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }
  const data = (await res.json()) as CreatedCard[];
  return { ok: true, data };
}
