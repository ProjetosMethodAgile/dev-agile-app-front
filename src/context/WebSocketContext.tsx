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
  // Tentativas de reconexão para o backoff exponencial
  const attemptRef = useRef<number>(0);
  // Para armazenar o timeout da reconexão
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // Flag para indicar que a desconexão foi manual (ex: inatividade)
  const manualDisconnectRef = useRef<boolean>(false);

  // Conecta o WebSocket com verificação dos estados CONNECTING/OPEN
  const connect = useCallback(() => {
    // Se já existe uma conexão em progresso ou aberta, não faz nada
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.CONNECTING ||
        wsRef.current.readyState === WebSocket.OPEN)
    ) {
      return;
    }
    console.log(
      "Tentando conectar o WebSocket, tentativa",
      attemptRef.current + 1,
    );
    // Reseta flag de desconexão manual ao tentar nova conexão
    manualDisconnectRef.current = false;
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket conectado");
      setWs(socket);
      wsRef.current = socket;
      // Reseta as tentativas de reconexão na conexão bem-sucedida
      attemptRef.current = 0;
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida do servidor:", event.data);
      // Aqui você pode adicionar lógica adicional para processar as mensagens recebidas
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
      setWs(null);
      wsRef.current = null;
      // Se a desconexão foi manual, não agendamos a reconexão
      if (manualDisconnectRef.current) {
        console.log("Desconexão manual. Não reconectando automaticamente.");
        manualDisconnectRef.current = false;
        return;
      }
      // Backoff exponencial para reconexão (máximo 30 segundos)
      attemptRef.current++;
      const delay = Math.min(2 ** attemptRef.current * 1000, 30000);
      console.log(`Tentando reconectar em ${delay} ms...`);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, delay);
    };
  }, []);

  // Desconecta o WebSocket de forma manual (ex: após período de inatividade)
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      console.log("Desconectando o WebSocket manualmente");
      manualDisconnectRef.current = true;
      wsRef.current.close();
      wsRef.current = null;
      setWs(null);
    }
    // Se houver uma reconexão pendente, cancela-a
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Atualiza o timestamp de atividade e reconecta se não houver conexão ativa
  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    // Só reconecta se não houver socket ou se estiver fechado/fechando
    if (
      !wsRef.current ||
      wsRef.current.readyState === WebSocket.CLOSED ||
      wsRef.current.readyState === WebSocket.CLOSING
    ) {
      console.log(
        "Atividade detectada - reconectando o WebSocket imediatamente",
      );
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      connect();
    }
  }, [connect]);

  useEffect(() => {
    // Conecta o WebSocket inicialmente
    connect();

    // Eventos que representam atividade do usuário
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((eventName) =>
      window.addEventListener(eventName, handleActivity),
    );

    // Checa periodicamente se houve inatividade superior ao limite definido
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

// Custom hook para consumir o contexto do WebSocket
export const useWebSocket = (): IWebSocketContext => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocket deve ser utilizado dentro de um WebSocketProvider.",
    );
  }
  return context;
};
