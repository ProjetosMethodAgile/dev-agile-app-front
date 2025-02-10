"use client";
import React from "react";
import { useUser } from "@/context/userContext";

export default function NavComponent() {
  const { user } = useUser();
  console.log(user);

  return <nav className="flex">{/* <p>{userData?.usuario.nome}</p> */}</nav>;
}
