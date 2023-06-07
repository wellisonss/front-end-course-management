import { api } from '../providers'
import { defineStore } from 'pinia'

interface Aluno {
  ID: string;
  NOME: string;
  MATRICULA: number;
  CURSO: string;
  EMAIL: string;
}

interface Professor {
  NOME: string;
  EMAIL: string;
  SIAEP: number;
  NUMERO: number;
  DEPARTAMENTO: string;
  SENHA: string;
}

interface UserAluno extends Aluno {}
interface UserProfessor extends Professor {}

export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    alunos: [] as Aluno[],
    professores: [] as Professor[],
    userAluno: {} as UserAluno,
    userProfessor: {} as UserProfessor
  }),

  actions: {
    async getAlunos() {
      try {
        const response = await api.get("/aluno");
        this.alunos = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getProfessores() {
      try {
        const response = await api.get("/professor");
        this.professores = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAlunoById(id: string) {

      await this.getAlunos();

      const aluno = this.alunos.find((aluno) => aluno.ID === id);

      if (aluno) {
        this.userAluno = aluno;
      } else {
        console.log(`Aluno com o ID ${id} não encontrado.`);
      }
    },

    async getProfessorById(siaep: number) {

      await this.getProfessores();
      const professor = this.professores.find((professor) => professor.SIAEP === siaep);

      if (professor) {
        this.userProfessor = professor;
      } else {
        console.log(`Professor com o ID ${siaep} não encontrado.`);
      }
    },

  }
})
