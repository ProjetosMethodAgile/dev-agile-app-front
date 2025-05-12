// src/actions/HelpDesk/relatorio/getDashboardMovements.ts
"use server";

import { cookies } from "next/headers";

import { GET_DASHBOARD_MOVEMENTS } from "@/functions/api";
import { ApiResult, MovementsResponse } from "@/types/api/apiTypes";

export default async function getDashboardMovements(
  query: URLSearchParams,
): Promise<ApiResult<MovementsResponse>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Token não encontrado.");

  const { url } = GET_DASHBOARD_MOVEMENTS(query);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60, tags: ["dash-helpdesk"] },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }
  const data = (await res.json()) as MovementsResponse;
  return { ok: true, data };
}
