// src/hooks/useKanbanWebSocket.ts
"use client";
import { useEffect, useState } from "react";

export default function useKanbanWebSocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // const socketUrl = "wss://devagile.com.br/socket/";
    const socketUrl = "ws://localhost:3001/socket";
    const newWs = new WebSocket(socketUrl);

    newWs.onopen = () => {
      console.log("WebSocket conectado ao servidor Kanban");
    };

    newWs.onmessage = (event) => {
      console.log("Mensagem do servidor Kanban:", event.data);
    };

    newWs.onclose = () => {
      console.log("WebSocket desconectado");
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  return ws;
}
