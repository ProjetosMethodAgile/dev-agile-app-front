// src/actions/dashboard/getDashboardCharts.ts
"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GET_DASHBOARD_CHARTS } from "@/functions/api";
import { ApiResult, ChartsData, TokenData } from "@/types/api/apiTypes";

export default async function getDashboardCharts(
  query: URLSearchParams,
): Promise<ApiResult<ChartsData>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, error: "Token not found.", statusCode: 401 };

  let user: TokenData;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
  } catch {
    return { ok: false, error: "Invalid token.", statusCode: 401 };
  }

  const { url } = GET_DASHBOARD_CHARTS(query);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }
  const data = (await res.json()) as ChartsData;
  return { ok: true, data };
}
