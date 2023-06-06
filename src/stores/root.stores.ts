import { api } from '../providers'
import { defineStore } from 'pinia'

interface Aluno {
  ID: string;
  NOME: string;
  MATRICULA: number;
  CURSO: string;
  EMAIL: string;
}

export type RootStores = {
  alunos: Aluno[];
}

export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    alunos: []
  } as RootStores ),

  actions: {
    async getAlunos () {
      await api.get("/aluno")
        .then((response) => {
          console.log(response);
          this.alunos = response.data
        })
        .catch((error) => console.log(error))

    },
  }

})