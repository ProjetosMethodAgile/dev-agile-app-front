"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// URL do WebSocket definida em .env.local ou .env
// Em Next.js, variáveis expostas ao cliente precisam do prefixo NEXT_PUBLIC_
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const INACTIVITY_LIMIT = 10 * 60 * 1000; // mantém conexão por até 10 minutos de inatividade
const CHECK_INTERVAL = 10 * 1000;

interface IWebSocketContext {
  ws: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<IWebSocketContext | undefined>(
  undefined,
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const lastActivityRef = useRef(Date.now());
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const manualDisconnectRef = useRef<boolean>(false);

  const connect = useCallback(() => {
    if (!SOCKET_URL) {
      console.error(
        "WebSocketProvider: variável NEXT_PUBLIC_SOCKET_URL não definida. Aborting connection.",
      );
      return;
    }

    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.CONNECTING ||
        wsRef.current.readyState === WebSocket.OPEN)
    ) {
      return;
    }
    manualDisconnectRef.current = false;

    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket conectado");
      setWs(socket);
      wsRef.current = socket;
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida do servidor:", event.data);
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
      setWs(null);
      wsRef.current = null;
      if (!manualDisconnectRef.current) {
        console.log("Tentando reconectar em 60000 ms...");
        reconnectTimeoutRef.current = setTimeout(connect, 60000);
      } else {
        manualDisconnectRef.current = false;
      }
    };
  }, [SOCKET_URL]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      manualDisconnectRef.current = true;
      wsRef.current.close();
      wsRef.current = null;
      setWs(null);
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();

    if (
      (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) &&
      !manualDisconnectRef.current
    ) {
      console.log("Atividade detectada e WS fechado → reconectando");
      connect();
    }
  }, [connect]);

  useEffect(() => {
    connect();

    const events = ["mousemove", "keydown", "scroll", "touchstart", "focus"];
    events.forEach((e) => window.addEventListener(e, handleActivity));

    const inactivityTimer = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (
        elapsed >= INACTIVITY_LIMIT &&
        wsRef.current?.readyState === WebSocket.OPEN
      ) {
        console.log("Usuário inativo → desconectando WS");
        disconnect();
      }
    }, CHECK_INTERVAL);

    const handleUnload = () => disconnect();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearInterval(inactivityTimer);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [connect, disconnect, handleActivity]);

  return (
    <WebSocketContext.Provider value={{ ws, connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): IWebSocketContext => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocket deve ser utilizado dentro de um WebSocketProvider.",
    );
  }
  return context;
};
