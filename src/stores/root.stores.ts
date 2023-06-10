import { defineStore } from 'pinia';
import { IAluno } from '@/Interfaces/IAluno'

interface Professor {
  NOME: string;
  EMAIL: string;
  SIAEP: number;
  NUMERO: number;
  DEPARTAMENTO: string;
  SENHA: string;
}

interface UserAluno extends IAluno {}
interface UserProfessor extends Professor {}

export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    alunos: [] as IAluno[],
    professores: [] as Professor[],
    userAluno: {} as UserAluno,
    userProfessor: {} as UserProfessor
  }),

  actions: {

    setAlunos(alunos: IAluno[]) {
      this.alunos = alunos;
    },

    async getAlunoById(id: string) {

      const aluno = this.alunos.find((aluno) => aluno.ID === id);

      if (aluno) {
        this.userAluno = aluno;
      } else {
        console.log(`Aluno com o ID ${id} não encontrado.`);
      }
    },

    async getProfessorById(siaep: number) {

      const professor = this.professores.find((professor) => professor.SIAEP === siaep);

      if (professor) {
        this.userProfessor = professor;
      } else {
        console.log(`Professor com o ID ${siaep} não encontrado.`);
      }
    },

  }
})
