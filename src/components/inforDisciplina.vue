<template>
  <button
    @click="authStore.logout"
    class="absolute right-0 top-0 mr-4 mt-4 flex items-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white"
  >
    <span>Sair</span>
  </button>

  <div class="m-16 mx-auto w-full max-w-sm rounded-md bg-white p-8 shadow-md">
    <h1 class="text-center text-lg text-gray-500">Informações da Disciplina</h1>

    <div class="p-4">
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Nome da Disciplina</label
        >
        <h1 class="text-sm text-gray-500">{{ userDisciplina?.NOME }}</h1>
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Curso</label
        >
        <h1 class="text-sm text-gray-500">{{ userDisciplina?.CURSO }}</h1>
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Descricao</label
        >
        <h1 class="text-sm text-gray-500">{{ userDisciplina?.DESCRICAO }}</h1>
      </div>
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Código da Disciplina</label
        >
        <h1 class="text-sm text-gray-500">
          {{ userDisciplina?.COD_DISCIPLINA }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore, useMainStore } from "../stores";
import { storeToRefs } from "pinia";

export default {
  name: "InforDisciplina",

  setup() {
    const authStore = useAuthStore();
    const mainStore = useMainStore();

    const { user } = storeToRefs(authStore);
    const { userDisciplina } = storeToRefs(mainStore);

    mainStore.getDisciplinaById(user.value.ID);

    return {
      userDisciplina,
      authStore,
    };
  },
};
</script>

<style scoped></style>
