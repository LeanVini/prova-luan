import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './navigation.css';

interface NavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentPage, onPageChange }) => {
  const { isConnected } = useWebSocket();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>📚 Escola Unifaat</h1>
          <p>Sistema de Gerenciamento Escolar</p>
        </div>

        <ul className="navbar-menu">
          <li>
            <button
              className={`nav-link ${currentPage === 'alunos' ? 'active' : ''}`}
              onClick={() => onPageChange('alunos')}
            >
              👨‍🎓 Alunos
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === 'professores' ? 'active' : ''}`}
              onClick={() => onPageChange('professores')}
            >
              👨‍🏫 Professores
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onPageChange('dashboard')}
            >
              📊 Dashboard
            </button>
          </li>
        </ul>

        <div className={`connection-badge ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="dot"></span>
          {isConnected ? 'WebSocket Ativo' : 'Desconectado'}
        </div>
      </div>
    </nav>
  );
};
