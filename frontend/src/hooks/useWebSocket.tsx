import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: string | null;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
  url?: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  url = 'ws://localhost:3000' 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket conectado');
      setIsConnected(true);
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log('Mensagem recebida:', event.data);
      setLastMessage(event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
    };

    socket.onerror = (error: Event) => {
      console.error('Erro WebSocket:', error);
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket deve ser usado dentro de WebSocketProvider');
  }
  return context;
};
