<template> 
    <div class="w-full col-span-1 relative lg:h-[60vh] h-[45vh] m-auto rounded-md shadow-md rounded-lg bg-white overflow-scroll">

      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <caption class="text-gray-500 text-lg text-center bg-gray-50 p-4">Turmas Abertas</caption>
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900">Vagas</th>
          <th scope="col" class="px-6 py-2 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="(item, index) in state.disciplinasNaoMatriculadas" :key="index">
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">{{ item.VAGAS }}</td>

          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a class="cursor-pointer" @click="matricularAluno(item.ID)">
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
import { getDisciplinaApi, createMatricularApi, getMatricularApi, updateDisciplinaApi, vagasDisciplinaApi } from "../providers"
import { IDisciplina } from "../Interfaces/IDisciplina";

interface State {
  disciplinasNaoMatriculadas: IDisciplina[];
  disciplinasMatriculadas: IDisciplina[];
}

export default {
  name: 'Matricula',

  async beforeMount() {
    await this.getDisicplinas();
    await this.setaDisciplinasUser();
  },
  
  setup() {
    
    const mainStore = useMainStore();
    
    const { disciplinas, userAluno, disciplinasUser } = storeToRefs(mainStore);

    const state = reactive<State>({
      disciplinasNaoMatriculadas: [],
      disciplinasMatriculadas: [],
    });

    // busca todas as disciplinas cadastrados no banco
    const getDisicplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

  const matricularAluno = async (idDisciplina: string) => {

  const vagasDisciplinaAtual = disciplinas.value.find((disciplina) => disciplina.ID === idDisciplina) 
  console.log(vagasDisciplinaAtual?.VAGAS)

    // adiciona ao banco uma linha com o id do usuario e o id da disciplina 
  await createMatricularApi(idDisciplina, userAluno.value.ID);
  await vagasDisciplinaApi(idDisciplina, vagasDisciplinaAtual?.VAGAS)

  setaDisciplinasUser();

};

const setaDisciplinasUser = async () => {

  // busca todas as matriculas
  const result = await getMatricularApi();
  // filtra as matriculas do usuario em questão
  const matriculasFiltradas = result.filter(matricula => matricula.ID_USUARIO === userAluno.value.ID);
  console.log("filtrando matricula", matriculasFiltradas);
  // filtra as disciplinas pelo id disciplina da tabela de matricula
  const disciplinasFiltradas = disciplinas.value.filter(disciplina =>
    matriculasFiltradas.some(matricula => matricula.ID_DISCIPLINA === disciplina.ID)
  );
  console.log("filtrando disciplinas pelo ID", disciplinasFiltradas)

  // state.disciplinasNaoMatriculadas = matriculasFiltradas;
  state.disciplinasMatriculadas = disciplinasFiltradas;

  // atualiza o state disciplinaUser
  mainStore.setDisciplinasUser(state.disciplinasMatriculadas);

  state.disciplinasNaoMatriculadas = disciplinas.value.filter(disciplina => !disciplinasUser.value.some(d => d.ID === disciplina.ID))

}

    
    return {
      disciplinas,
      getDisicplinas,
      mainStore,
      matricularAluno,
      setaDisciplinasUser,
      state
    };
  }
  
}

</script>

<style scoped>
</style>
