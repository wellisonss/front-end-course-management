<template>
  <div>
    <div class="mb-4" >
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="number" id="name" name="name" v-model="matricula" placeholder="matricula">
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text" id="matricula" v-model="senha" placeholder="nova senha">
      </div>
      
      <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="loginUser()">Adicionar</button>
    </div>
  </div> 
  
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMainStore, useAuthStore } from "../stores"
import { api } from "../providers"


export default {
  name: 'login',
  
  setup() {
    
    const authStore = useAuthStore();
    
    const matricula = ref();
    const senha = ref("");  
    
    const loginUser = () => {  
            
      authStore.loginUser(matricula.value, senha.value);
            
    };
    
    
    return {
      matricula,
      senha,
      loginUser
      
    };
  }
  
}
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
