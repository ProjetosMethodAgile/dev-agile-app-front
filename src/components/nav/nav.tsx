"use client";
import React from "react";
import { useUser } from "@/context/userContext";

export default function NavComponent() {
  const { user } = useUser();

  return <nav className="flex">{user?.usuario.nome}</nav>;
}
