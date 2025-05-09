// src/actions/dashboard/getDashboardSummary.ts
"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GET_DASHBOARD_SUMMARY } from "@/functions/api";
import { ApiResult, Summary, TokenData } from "@/types/api/apiTypes";

export default async function getDashboardSummary(
  query: URLSearchParams,
): Promise<ApiResult<Summary>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, error: "Token not found.", statusCode: 401 };

  let user: TokenData;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
  } catch {
    return { ok: false, error: "Invalid token.", statusCode: 401 };
  }

  const { url } = GET_DASHBOARD_SUMMARY(query);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }
  const data = (await res.json()) as Summary;
  return { ok: true, data };
}
