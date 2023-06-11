import { defineStore } from "pinia";
import { IAluno } from "@/Interfaces/IAluno";
import { IProfessor } from "@/Interfaces/IProfessor";
import { IDisciplina } from "@/Interfaces/IDisciplina";
import { api } from "@/providers";

interface UserAluno extends IAluno {}
interface UserProfessor extends IProfessor {}
interface UserDisciplina extends IDisciplina {}

export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    disciplinas: [] as IDisciplina[],
    alunos: [] as IAluno[],
    professores: [] as IProfessor[],
    userAluno: {} as UserAluno,
    userProfessor: {} as UserProfessor,
    userDisciplina: {} as UserDisciplina,
  }),

  actions: {
    setAlunos(alunos: IAluno[]) {
      this.alunos = alunos;
    },

    setProfessores(professores: IProfessor[]) {
      this.professores = professores;
    },

    async getDisciplinas() {
      try {
        const response = await api.get("/disciplina");
        this.disciplinas = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getAlunoById(id: string) {
      const aluno = this.alunos.find((aluno) => aluno.ID === id);

      if (aluno) {
        this.userAluno = aluno;
      } else {
        console.log(`Aluno com o ID ${id} não encontrado.`);
      }
    },

    async getDisciplinaById(cod: string) {
      await this.getDisciplinas();
      const disciplina = this.disciplinas.find(
        (disciplina) => disciplina.COD_DISCIPLINA === cod
      );

      if (disciplina) {
        this.userDisciplina = disciplina;
      } else {
        console.log(`Disciplina com cod ${cod} não encontrado`);
      }
    },

    async getProfessorById(siaep: number) {
      const professor = this.professores.find(
        (professor) => professor.SIAEP === siaep
      );

      if (professor) {
        this.userProfessor = professor;
      } else {
        console.log(`Professor com o ID ${siaep} não encontrado.`);
      }
    },
  },
});
