<template> 
  <button @click="authStore.logout" class="absolute top-0 right-0 mt-4 mr-4 flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded">
    <span>Sair</span>
  </button>
  
    <div class="w-full max-w-sm mx-auto bg-white rounded-md shadow-md p-8 m-16">
      <h1 class="text-gray-500 text-lg text-center"> Informações do Professor </h1>
      
      <div class="p-4"> 
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nome</label>
          <h1 class="text-gray-500 text-sm"> {{ userProfessor?.NOME }}</h1>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Departamento</label>
          <h1 class="text-gray-500 text-sm"> {{ userProfessor?.DEPARTAMENTO }}</h1>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
          <h1 class="text-gray-500 text-sm"> {{ userProfessor?.EMAIL }}</h1>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">SIAEP</label>
          <h1 class="text-gray-500 text-sm"> {{ userProfessor?.SIAEP }}</h1>
        </div>
      </div>
    </div>
    
  </template>
  
  <script lang="ts">
  
  import { useAuthStore, useMainStore } from "../stores"
  import { storeToRefs } from "pinia"
  
  export default {
    name: 'InforProfessor',
    
    setup() {
      
      const authStore = useAuthStore();
      const mainStore = useMainStore();
      
      const { user } = storeToRefs(authStore);
      const { userProfessor } = storeToRefs(mainStore);
      
      mainStore.getProfessorById(user.value.USUARIO);
      
      return {
        userProfessor,
        authStore
      };
    }
    
  }
  
  </script>
  
  <style scoped>
  </style>
  