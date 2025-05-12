"use server";

import { cookies } from "next/headers";

import { ApiResult, HeatmapEntry } from "@/types/api/apiTypes";
import { GET_DASHBOARD_CALENDAR } from "@/functions/api";

export default async function getDashboardCalendar(
  raw: URLSearchParams | Record<string, string>,
): Promise<ApiResult<HeatmapEntry[]>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado");

  // normaliza raw em URLSearchParams
  const params =
    raw instanceof URLSearchParams
      ? raw
      : new URLSearchParams(Object.entries(raw));

  // monta URL corretamente
  const { url } = GET_DASHBOARD_CALENDAR(params);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    // você pode usar revalidate/tags aqui, se quiser:
    next: { revalidate: 60, tags: ["dash-helpdesk"] },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }

  const data = (await res.json()) as HeatmapEntry[];
  return { ok: true, data };
}
