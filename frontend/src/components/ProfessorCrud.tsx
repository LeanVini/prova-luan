import React, { useState, useEffect } from 'react';
import api, { Professor } from '../services/api';
import './crud.css';

export const ProfessorCrud: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Professor>({ nome: '', disciplina: '' });
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProfessores();
      setProfessores(data);
    } catch (err) {
      setError('Erro ao carregar professores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editing !== null) {
        await api.updateProfessor(editing, form);
        setEditing(null);
      } else {
        await api.createProfessor(form);
      }
      setForm({ nome: '', disciplina: '' });
      fetchProfessores();
    } catch (err) {
      setError('Erro ao salvar professor');
      console.error(err);
    }
  };

  const handleEdit = (professor: Professor) => {
    setForm(professor);
    setEditing(professor.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        await api.deleteProfessor(id);
        fetchProfessores();
      } catch (err) {
        setError('Erro ao excluir professor');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setForm({ nome: '', disciplina: '' });
    setEditing(null);
  };

  return (
    <div className="crud-container">
      <h2>Gerenciamento de Professores</h2>

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
            placeholder="Digite o nome do professor"
          />
        </div>

        <div className="form-group">
          <label htmlFor="disciplina">Disciplina:</label>
          <input
            type="text"
            id="disciplina"
            name="disciplina"
            value={form.disciplina}
            onChange={handleChange}
            required
            placeholder="Digite a disciplina"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {editing ? 'Atualizar' : 'Criar'} Professor
          </button>
          {editing && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Carregando professores...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Disciplina</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.nome}</td>
                <td>{professor.disciplina}</td>
                <td>
                  <button
                    onClick={() => handleEdit(professor)}
                    className="btn btn-small btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(professor.id)}
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
