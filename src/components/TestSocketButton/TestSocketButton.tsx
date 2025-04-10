"use client";
import React from "react";
import { useWebSocket } from "@/context/WebSocketContext";

export default function TestSocketButton() {
  const { ws } = useWebSocket();

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
