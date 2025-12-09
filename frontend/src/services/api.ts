import axios, { AxiosInstance } from 'axios';

interface Aluno {
  id?: number;
  nome: string;
  idade: number;
}

interface Professor {
  id?: number;
  nome: string;
  disciplina: string;
}

interface Materia {
  id?: number;
  nome: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Alunos
  async getAlunos(): Promise<Aluno[]> {
    const response = await this.client.get<Aluno[]>('/alunos');
    return response.data;
  }

  async getAlunoById(id: number): Promise<Aluno> {
    const response = await this.client.get<Aluno>(`/alunos/${id}`);
    return response.data;
  }

  async createAluno(aluno: Aluno): Promise<Aluno> {
    const response = await this.client.post<Aluno>('/alunos', aluno);
    return response.data;
  }

  async updateAluno(id: number, aluno: Aluno): Promise<Aluno> {
    const response = await this.client.put<Aluno>(`/alunos/${id}`, aluno);
    return response.data;
  }

  async deleteAluno(id: number): Promise<void> {
    await this.client.delete(`/alunos/${id}`);
  }

  // Professores
  async getProfessores(): Promise<Professor[]> {
    const response = await this.client.get<Professor[]>('/professores');
    return response.data;
  }

  async getProfessorById(id: number): Promise<Professor> {
    const response = await this.client.get<Professor>(`/professores/${id}`);
    return response.data;
  }

  async createProfessor(professor: Professor): Promise<Professor> {
    const response = await this.client.post<Professor>('/professores', professor);
    return response.data;
  }

  async updateProfessor(id: number, professor: Professor): Promise<Professor> {
    const response = await this.client.put<Professor>(`/professores/${id}`, professor);
    return response.data;
  }

  async deleteProfessor(id: number): Promise<void> {
    await this.client.delete(`/professores/${id}`);
  }

  // Matérias
  async getMaterias(): Promise<Materia[]> {
    const response = await this.client.get<Materia[]>('/materias');
    return response.data;
  }

  async getMateriaById(id: number): Promise<Materia> {
    const response = await this.client.get<Materia>(`/materias/${id}`);
    return response.data;
  }

  async createMateria(materia: Materia): Promise<Materia> {
    const response = await this.client.post<Materia>('/materias', materia);
    return response.data;
  }

  async updateMateria(id: number, materia: Materia): Promise<Materia> {
    const response = await this.client.put<Materia>(`/materias/${id}`, materia);
    return response.data;
  }

  async deleteMateria(id: number): Promise<void> {
    await this.client.delete(`/materias/${id}`);
  }
}

export default new ApiClient();
export type { Aluno, Professor, Materia };
