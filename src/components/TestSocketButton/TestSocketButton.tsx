// src/components/TestSocketButton.tsx
"use client";
import React from "react";
import useKanbanWebSocket from "@/hooks/useKanbanWebSocket";

export default function TestSocketButton() {
  const ws = useKanbanWebSocket();

  const handleClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "testEvent", message: "Hello from client!" }),
      );
      console.log("Mensagem enviada: testEvent");
    } else {
      console.log("WebSocket não está conectado");
    }
  };

  return (
    <button onClick={handleClick} style={{ padding: "10px", fontSize: "16px" }}>
      Test WebSocket
    </button>
  );
}
