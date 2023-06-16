<template> 
    <div class="w-full col-span-1 relative lg:h-[60vh] h-[45vh] m-auto rounded-md shadow-md rounded-lg bg-white overflow-scroll">

      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <caption class="text-gray-500 text-lg text-center bg-gray-50 p-4">Disciplinas Sem Professor</caption>
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="(item, index) in state.disciplinasNaoMatriculadas" :key="index">
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a class="cursor-pointer" @click="vincularProfessorDisciplina(item.ID)">
                <svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>  
</template>

<script lang="ts">

import { useMainStore } from "../stores"
import { storeToRefs } from "pinia"
import { vincularProfessor, getDisciplinaApi } from "../providers"
import { IDisciplina } from "../Interfaces/IDisciplina";

interface State {
  disciplinasNaoMatriculadas: IDisciplina[];
}

export default {
  name: 'DisciplinasDisponiveis',

  async beforeMount() {
    await this.getDisciplinas();
    await this.setaDisciplinasSemProfessor();
  },
  
  setup() {
    
    const mainStore = useMainStore();
    
    const { disciplinas, userProfessor } = storeToRefs(mainStore);

    const state = reactive<State>({
      disciplinasNaoMatriculadas: [],
    });

    // busca todas as disciplinas cadastrados no banco
    const getDisciplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

  const vincularProfessorDisciplina = async (idDisciplina: string) => {

    // adiciona ao banco uma linha com o id do usuario e o id da disciplina 
  await vincularProfessor(idDisciplina, userProfessor.value.ID);

  console.log(idDisciplina)
  console.log(userProfessor.value.ID)


  setaDisciplinasSemProfessor();

};

const setaDisciplinasSemProfessor = async () => {
  await getDisciplinas();
  state.disciplinasNaoMatriculadas = disciplinas.value.filter(disciplina => disciplina.ID_PROFESSOR === null);
}
    
    return {
      disciplinas,
      getDisciplinas,
      mainStore,
      vincularProfessorDisciplina,
      state,
      setaDisciplinasSemProfessor
    };
  }
  
}

</script>

<style scoped>
</style>
