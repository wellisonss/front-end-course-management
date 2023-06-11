<template>
  <!-- component -->
  <div class="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
    <table
      class="w-full border-collapse bg-white text-left text-sm text-gray-500"
    >
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Curso</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Descricao
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Código
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr
          class="hover:bg-gray-50"
          v-for="(item, index) in disciplinas"
          :key="index"
        >
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4">{{ item.DESCRICAO }}</td>
          <td class="px-6 py-4">{{ item.COD_DISCIPLINA }}</td>

          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <a
                x-data="{ tooltip: 'Delete' }"
                @click="deleteDisciplina(item.ID)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </a>
              <a x-data="{ tooltip: 'Edite' }" @click="openModalD(item.ID)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <div v-if="showModalD" class="modal">
      <div
        class="m-16 mx-auto w-full max-w-sm rounded-md bg-white p-10 p-8 shadow-md"
      >
        <span class="close" @click="closeModalD">&times;</span>
        <slot>
          <div class="mb-4">
            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Name</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="name"
                name="name"
                v-model="nome"
                placeholder="nome do aluno"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >curso</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="curso"
                v-model="curso"
                placeholder="nova senha"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >descricao</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="descricao"
                v-model="descricao"
                placeholder="curso"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >codigo</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="codigo"
                v-model="codigo"
                placeholder="email do aluno"
              />
            </div>

            <button
              class="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600"
              @click="updateDisciplina()"
            >
              Atualizar
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from "../providers";
import { ref } from "vue";

import { useMainStore } from "../stores";
import { storeToRefs } from "pinia";

export default {
  name: "TableDisciplinaVue",

  setup() {
    const mainStore = useMainStore();
    const { disciplinas } = storeToRefs(mainStore);

    const nome = ref("");
    const curso = ref("");
    const descricao = ref("");
    const codigo = ref("");

    const showModalD = ref(false);

    const idDisciplina = ref("");

    const openModalD = (codigo: string) => {
      idDisciplina.value = codigo;

      showModalD.value = true;
    };

    const closeModalD = () => {
      showModalD.value = false;
    };

    const getDisciplinas = async () => {
      await api
        .get("/disciplina")
        .then((response) => {
          console.log(response);
          disciplinas.value = response.data;
        })
        .catch((error) => console.log(error));
    };

    const deleteDisciplina = async (codigo: string) => {
      console.log("teste", codigo);

      await api
        .delete("disciplina/" + codigo)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      getDisciplinas();
    };

    const updateDisciplina = async () => {
      await api
        .put("disciplina/" + idDisciplina.value, {
          NOME: nome.value,
          CURSO: curso.value,
          EMAIL: descricao.value,
          SENHA: codigo.value,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      getDisciplinas();
      closeModalD();

      console.log("Nome:", nome.value);
      console.log("Curso:", curso.value);
      console.log("Descricao:", descricao.value);
      console.log("Codigo:", codigo.value);
    };

    getDisciplinas();

    return {
      disciplinas,
      deleteDisciplina,
      getDisciplinas,
      updateDisciplina,
      openModalD,
      closeModalD,
      showModalD,
      idDisciplina,
      nome,
      curso,
      descricao,
      codigo,
    };
  },
};
</script>

<style scoped></style>
