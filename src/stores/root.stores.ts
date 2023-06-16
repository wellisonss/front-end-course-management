import { IDisciplina } from './../Interfaces/IDisciplina';
import { defineStore } from 'pinia';
import { IAluno } from '@/Interfaces/IAluno'
import { IProfessor } from '@/Interfaces/IProfessor';

interface UserAluno extends IAluno {}
interface UserProfessor extends IProfessor {}


export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    alunos: [] as IAluno[],
    professores: [] as IProfessor[],
    userAluno: {} as UserAluno,
    userProfessor: {} as UserProfessor,
    disciplinas: [] as IDisciplina[],
    disciplinasUser: [] as IDisciplina[],  

  }),

  actions: {

    setAlunos(alunos: IAluno[]) {
      this.alunos = alunos;
    },

    setProfessores(professores: IProfessor[]){
      this.professores = professores;
    },

    setDisciplinasUser(disciplinas: IDisciplina[]) {
      this.disciplinasUser = disciplinas;
    },

    setDisciplinas(disciplinas: IDisciplina[]) {
      this.disciplinas = disciplinas;
    },

    async getAlunoById(id: string) {

      const aluno = this.alunos.find((aluno) => aluno.ID === id);

      if (aluno) {
        this.userAluno = aluno;
      } else {
        console.log(`Aluno com o ID ${id} não encontrado.`);
      }
    },

    async getProfessorById(id: string) {

      const professor = this.professores.find((professor) => professor.ID === id);

      if (professor) {
        this.userProfessor = professor;
      } else {
        console.log(`Professor com o ID ${id} não encontrado.`);
      }
    },

  }
})
