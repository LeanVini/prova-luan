import React, { useState, useEffect } from 'react';
import api, { Aluno, Professor } from '../services/api';
import './dashboard.css';

export const Dashboard: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunosData, professoresData] = await Promise.all([
          api.getAlunos(),
          api.getProfessores(),
        ]);
        setAlunos(alunosData);
        setProfessores(professoresData);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Carregando dados...</div>;
  }

  const idadeMedia =
    alunos.length > 0
      ? (alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length).toFixed(1)
      : 0;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>Total de Alunos</h3>
            <p className="stat-number">{alunos.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>Total de Professores</h3>
            <p className="stat-number">{professores.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎂</div>
          <div className="stat-content">
            <h3>Idade Média dos Alunos</h3>
            <p className="stat-number">{idadeMedia} anos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Razão Aluno/Professor</h3>
            <p className="stat-number">
              {professores.length > 0
                ? (alunos.length / professores.length).toFixed(1)
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="section">
          <h3>Últimos Alunos Cadastrados</h3>
          {alunos.length > 0 ? (
            <ul className="list">
              {alunos.slice(-5).map((aluno) => (
                <li key={aluno.id}>
                  <span className="name">{aluno.nome}</span>
                  <span className="meta">{aluno.idade} anos</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum aluno cadastrado</p>
          )}
        </div>

        <div className="section">
          <h3>Últimos Professores Cadastrados</h3>
          {professores.length > 0 ? (
            <ul className="list">
              {professores.slice(-5).map((professor) => (
                <li key={professor.id}>
                  <span className="name">{professor.nome}</span>
                  <span className="meta">{professor.disciplina}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum professor cadastrado</p>
          )}
        </div>
      </div>
    </div>
  );
};
