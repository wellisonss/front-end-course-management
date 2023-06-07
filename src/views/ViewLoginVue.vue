<template>
  <div>
    <div class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md p-10 m-16" >
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Usuario</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="number" id="usuario" name="name" v-model="usuario" placeholder="usuario">
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text" id="senha" v-model="senha" placeholder="senha">
      </div>
      
      <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="loginUser()">Entrar</button>
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
    
    const usuario = ref();
    const senha = ref("");  
    
    const loginUser = () => {  
            
      authStore.loginUser(usuario.value, senha.value);
            
    };
    
    
    return {
      usuario,
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
