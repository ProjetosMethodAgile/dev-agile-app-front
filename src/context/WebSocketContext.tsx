"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SOCKET_URL = "wss://devagile.com.br/socket/";
// const SOCKET_URL = "ws://localhost:3001/socket";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // opcional, mantém se quiser
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
  }, []);

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

    // Se o WS estiver fechado (ou nunca conectado), tenta reconectar
    if (
      (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) &&
      !manualDisconnectRef.current
    ) {
      console.log("Atividade detectada e WS fechado → reconectando");
      connect();
    }
  }, [connect]);

  useEffect(() => {
    // conexão inicial
    connect();

    // eventos de atividade + foco
    const events = ["mousemove", "keydown", "scroll", "touchstart", "focus"];
    events.forEach((e) => window.addEventListener(e, handleActivity));

    // checagem de inatividade (opcional)
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

    // desconecta no unload
    const handleUnload = () => disconnect();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearInterval(inactivityTimer);
      window.removeEventListener("beforeunload", handleUnload);
      // não desconecta aqui para manter vivo em HMR/navegação interna
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
