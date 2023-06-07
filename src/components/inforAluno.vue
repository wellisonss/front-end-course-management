<template> 
<button @click="authStore.logout" class="absolute top-0 right-0 mt-4 mr-4 flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded">
  <span>Sair</span>
</button>

  <div class="w-full max-w-sm mx-auto bg-white rounded-md shadow-md p-8 m-16">
    <h1 class="text-gray-500 text-lg text-center"> Informações do Aluno </h1>
    
    <div class="p-4"> 
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nome do Usuario</label>
        <h1 class="text-gray-500 text-sm"> {{ userAluno?.NOME }}</h1>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Curso</label>
        <h1 class="text-gray-500 text-sm"> {{ userAluno?.CURSO }}</h1>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
        <h1 class="text-gray-500 text-sm"> {{ userAluno?.EMAIL }}</h1>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Matrícula</label>
        <h1 class="text-gray-500 text-sm"> {{ userAluno?.MATRICULA }}</h1>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">

import { useAuthStore, useMainStore } from "../stores"
import { storeToRefs } from "pinia"

export default {
  name: 'InforAluno',
  
  setup() {
    
    const authStore = useAuthStore();
    const mainStore = useMainStore();
    
    const { user } = storeToRefs(authStore);
    const { userAluno } = storeToRefs(mainStore);
    
    mainStore.getAlunoById(user.value.ID);
    
    return {
      userAluno,
      authStore
    };
  }
  
}

</script>

<style scoped>
</style>
