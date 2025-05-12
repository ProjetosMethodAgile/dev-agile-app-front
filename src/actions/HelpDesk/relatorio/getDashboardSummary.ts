// src/actions/dashboard/getDashboardSummary.ts
"use server";

import { cookies } from "next/headers";

import { GET_DASHBOARD_SUMMARY } from "@/functions/api";
import { ApiResult, Summary } from "@/types/api/apiTypes";

export default async function getDashboardSummary(
  query: URLSearchParams,
): Promise<ApiResult<Summary>> {
  const token = (await cookies()).get("token")?.value;

  if (!token) throw new Error("Token não encontrado");

  const { url } = GET_DASHBOARD_SUMMARY(query);
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
  const data = (await res.json()) as Summary;

  return { ok: true, data };
}
