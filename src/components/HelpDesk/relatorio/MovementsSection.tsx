// src/components/HelpDesk/relatorio/MovementsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import MovementsTable from "./MovementsTable";
import { MovementsResponse } from "@/types/api/apiTypes";
import getDashboardMovements from "@/actions/HelpDesk/relatorio/getDashboardMovements";

interface Props {
  baseQuery: URLSearchParams;
}

export default function MovementsSection({ baseQuery }: Props) {
  const [response, setResponse] = useState<MovementsResponse>({
    total: 0,
    page: 1,
    pageSize: 5,
    movements: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPage = async (page: number, searchTerm: string) => {
    setLoading(true);
    // monta a query string
    const qp = new URLSearchParams(baseQuery.toString());
    qp.set("page", String(page));
    qp.set("pageSize", String(response.pageSize));
    if (searchTerm) qp.set("search", searchTerm);

    // chama a server‐action
    const result = await getDashboardMovements(qp);
    if (result.ok) {
      setResponse(result.data);
    } else {
      console.error(result.error);
      setResponse((prev) => ({ ...prev, movements: [] }));
    }
    setLoading(false);
  };

  // recarrega sempre que baseQuery mudar
  useEffect(() => {
    loadPage(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseQuery.toString()]);

  if (loading) return <p>Carregando...</p>;

  return (
    <MovementsTable
      response={response}
      onPageChange={(p) => loadPage(p, search)}
      onFilterTitle={(t) => {
        setSearch(t);
        loadPage(1, t);
      }}
    />
  );
}
