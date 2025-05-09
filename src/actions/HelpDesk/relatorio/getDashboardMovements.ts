// src/actions/dashboard/getDashboardMovements.ts
"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GET_DASHBOARD_MOVEMENTS } from "@/functions/api";
import { ApiResult, Movement, TokenData } from "@/types/api/apiTypes";

export default async function getDashboardMovements(
  query: URLSearchParams,
): Promise<ApiResult<Movement[]>> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { ok: false, error: "Token not found.", statusCode: 401 };

  let user: TokenData;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
  } catch {
    return { ok: false, error: "Invalid token.", statusCode: 401 };
  }

  const { url } = GET_DASHBOARD_MOVEMENTS(query);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, statusCode: res.status };
  }
  const data = (await res.json()) as Movement[];
  return { ok: true, data };
}
