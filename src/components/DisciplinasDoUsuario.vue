<template>
  <div class="w-full col-span-1 relative lg:h-[60vh] h-[45vh] m-auto rounded-md shadow-md rounded-lg bg-white overflow-scroll">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Curso</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="(item, index) in state.disciplinasMatriculadas" :key="index">
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4"></td>
        </tr>
      </tbody>
    </table>

    <div class="p-4"></div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "../stores";
import { storeToRefs } from "pinia";
import { getDisciplinaApi, getMatricularApi } from "../providers";
import { IMatricula } from "../Interfaces/IMatricula";
import { IDisciplina } from "../Interfaces/IDisciplina";
import { reactive } from "vue";

interface State {
  matriculasDoAluno: IMatricula[];
  disciplinasMatriculadas: IDisciplina[];
}

export default {
  name: 'DisciplinasDoUsuario',

  async beforeMount() {
    await this.getDisicplinas();
    await this.getMatriculasDoAluno();
  },

  setup() {
    const mainStore = useMainStore();
    const { disciplinas, userAluno } = storeToRefs(mainStore);

    const state = reactive<State>({
      matriculasDoAluno: [],
      disciplinasMatriculadas: []
    });

    const getDisicplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

    const getMatriculasDoAluno = async () => {
      const result = await getMatricularApi();
      state.matriculasDoAluno = result.filter(matricula => matricula.ID_USUARIO === userAluno.value.ID);
      state.disciplinasMatriculadas = disciplinas.value.filter(disciplina =>
        state.matriculasDoAluno.some(matricula => matricula.ID_DISCIPLINA === disciplina.ID)
      );
    };

    console.log("disciplinas", disciplinas);

    return {
      disciplinas,
      getDisicplinas,
      mainStore,
      state,
      getMatriculasDoAluno
    };
  }
}
</script>

<style scoped>
</style>
