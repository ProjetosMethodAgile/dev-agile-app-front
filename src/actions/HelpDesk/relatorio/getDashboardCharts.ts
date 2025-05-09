// src/actions/dashboard/getDashboardCharts.ts
"use server";

import { cookies } from "next/headers";
import { GET_DASHBOARD_CHARTS } from "@/functions/api";
import { ApiResult, ChartsData } from "@/types/api/apiTypes";

export default async function getDashboardCharts(
  query: URLSearchParams,
): Promise<ApiResult<ChartsData>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, error: "Token not found.", statusCode: 401 };

  if (!token) throw new Error("Token não encontrado");

  const { url } = GET_DASHBOARD_CHARTS(query);
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
  const data = (await res.json()) as ChartsData;
  return { ok: true, data };
}
