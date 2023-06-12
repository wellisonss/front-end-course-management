<template>
  <!-- tabela -->
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Descrição</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Código</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="(item, index) in disciplinas" :key="index">
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">{{ item.DESCRICAO }}</td>
          <td class="px-6 py-4">{{ item.COD_DISCIPLINA }}</td>
          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a @click="deleteDiscipla(item.ID)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import {  getDisciplinaApi, deleteDisciplinaApi } from '../providers';
import { useMainStore } from '../stores';
import { storeToRefs } from 'pinia';

interface State {
  nome: string;
  curso: string;
  descricao: string;
  codigo: string;
  showModal: boolean;
}



export default {
  name: 'TableDisciplinaVue',

  beforeMount() {
    this.getDisicplinas();
  },

  setup() {
    const mainStore = useMainStore();
    const { disciplinas } = storeToRefs(mainStore);

    const state = reactive<State>({
      nome: '',
      curso: '',
      descricao: '',
      codigo: '',
      showModal: false,
    });

    const idDisciplina = ref('');

    const closeModal = () => {
      state.showModal = false;
    };

    const getDisicplinas = async () => {
      const disciplinas = await getDisciplinaApi();
      mainStore.setDisciplinas(disciplinas);
    };

    const deleteDiscipla = async (id: string) => {
      await deleteDisciplinaApi(id);
      getDisicplinas();
    };

 
    return {
      disciplinas,
      closeModal,
      idDisciplina,
      state,
      deleteDiscipla,
      getDisicplinas
    };
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
