import React, { useState, useEffect } from 'react';
import api, { Aluno } from '../services/api';
import './crud.css';

export const AlunoCrud: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Aluno>({ nome: '', idade: 0 });
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAlunos();
      setAlunos(data);
    } catch (err) {
      setError('Erro ao carregar alunos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'idade' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editing !== null) {
        await api.updateAluno(editing, form);
        setEditing(null);
      } else {
        await api.createAluno(form);
      }
      setForm({ nome: '', idade: 0 });
      fetchAlunos();
    } catch (err) {
      setError('Erro ao salvar aluno');
      console.error(err);
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setForm(aluno);
    setEditing(aluno.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await api.deleteAluno(id);
        fetchAlunos();
      } catch (err) {
        setError('Erro ao excluir aluno');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setForm({ nome: '', idade: 0 });
    setEditing(null);
  };

  return (
    <div className="crud-container">
      <h2>Gerenciamento de Alunos</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do aluno"
          />
        </div>

        <div className="form-group">
          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            required
            min="0"
            max="100"
            placeholder="Digite a idade"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {editing ? 'Atualizar' : 'Criar'} Aluno
          </button>
          {editing && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Carregando alunos...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.idade}</td>
                <td>
                  <button
                    onClick={() => handleEdit(aluno)}
                    className="btn btn-small btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(aluno.id)}
                    className="btn btn-small btn-delete"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
