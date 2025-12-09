import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './websocket.css';

export const WebSocketMonitor: React.FC = () => {
  const { isConnected, lastMessage } = useWebSocket();

  return (
    <div className="websocket-monitor">
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <div className="status-dot"></div>
        <span>{isConnected ? 'WebSocket Conectado' : 'WebSocket Desconectado'}</span>
      </div>

      {lastMessage && (
        <div className="last-message">
          <h4>Última Mensagem:</h4>
          <p>{lastMessage}</p>
        </div>
      )}
    </div>
  );
};
