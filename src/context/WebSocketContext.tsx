// src/context/WebSocketContext.tsx
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

// 10 minutos de inatividade
const INACTIVITY_LIMIT = 10 * 60 * 1000;
// Checa a cada 10 segundos
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
  // Armazena a instância do WebSocket
  const wsRef = useRef<WebSocket | null>(null);
  // Registra a última atividade do usuário
  const lastActivityRef = useRef(Date.now());
  // Timer para inatividade
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Timeout da reconexão
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // Flag para desconexão manual (ex: por inatividade)
  const manualDisconnectRef = useRef<boolean>(false);

  const connect = useCallback(() => {
    // Se já há uma conexão em progresso ou aberta, não tenta novamente.
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.CONNECTING ||
        wsRef.current.readyState === WebSocket.OPEN)
    ) {
      return;
    }
    console.log("Tentando conectar o WebSocket");
    manualDisconnectRef.current = false;
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket conectado");
      setWs(socket);
      wsRef.current = socket;
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida do servidor:", event.data);
      // Lógica para processar as mensagens pode ser adicionada aqui.
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
      setWs(null);
      wsRef.current = null;
      // Se a desconexão foi manual, não tenta reconectar.
      if (manualDisconnectRef.current) {
        console.log("Desconexão manual. Não reconectando automaticamente.");
        manualDisconnectRef.current = false;
        return;
      }
      // Tenta reconectar após 1 minuto (60.000 ms)
      console.log("Tentando reconectar em 60000 ms...");
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 60000);
    };
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      console.log("Desconectando o WebSocket manualmente");
      manualDisconnectRef.current = true;
      wsRef.current.close();
      wsRef.current = null;
      setWs(null);
    }
    // Se houver reconexão pendente, cancela-a
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Agora, handleActivity apenas atualiza o timestamp de atividade
  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    // Conecta inicialmente o WebSocket
    connect();

    // Registra eventos de atividade do usuário
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((eventName) =>
      window.addEventListener(eventName, handleActivity),
    );

    // Verifica periodicamente a inatividade para desconectar o WebSocket
    inactivityTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (
        elapsed >= INACTIVITY_LIMIT &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        console.log(
          "Usuário inativo por 10 minutos - desconectando o WebSocket",
        );
        disconnect();
      }
    }, CHECK_INTERVAL);

    // Cleanup: remove os listeners e fecha a conexão
    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, handleActivity),
      );
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
      disconnect();
    };
  }, [handleActivity, connect, disconnect]);

  const contextValue: IWebSocketContext = {
    ws,
    connect,
    disconnect,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook para consumir o contexto do WebSocket
export const useWebSocket = (): IWebSocketContext => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocket deve ser utilizado dentro de um WebSocketProvider.",
    );
  }
  return context;
};
