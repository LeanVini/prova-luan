import React, { useState } from 'react';
import { WebSocketProvider } from './hooks/useWebSocket';
import { Navigation } from './components/Navigation';
import { AlunoCrud } from './components/AlunoCrud';
import { ProfessorCrud } from './components/ProfessorCrud';
import { Dashboard } from './components/Dashboard';
import { WebSocketMonitor } from './components/WebSocketMonitor';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'alunos':
        return <AlunoCrud />;
      case 'professores':
        return <ProfessorCrud />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <WebSocketProvider url="ws://localhost:3000">
      <div className="app">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <WebSocketMonitor />
        <main className="main-content">
          {renderPage()}
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Escola Unifaat. Sistema de Gerenciamento Escolar.</p>
        </footer>
      </div>
    </WebSocketProvider>
  );
};

export default App;
