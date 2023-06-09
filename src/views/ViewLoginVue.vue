<template>
  <div>
    <div class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md p-10 m-16" >

      <div class="flex flex-col items-center space-y-3">
            <span class="text-2xl font-semi-bold leading-normal" >Login</span>
        </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Usuario</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="number" id="usuario" name="name" v-model="state.usuario" placeholder="usuario">
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text" id="senha" v-model="state.senha" placeholder="senha">
      </div>

      <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 my-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="loginUser()">Entrar</button>
      <div class="w-full text-center">
        <span class="text-sm text-blue-600">Cadastre-se</span>
    </div>
     <div class="flex justify-center items-center">
        <PostAlunoModal :nome-botao="botaoAluno"></PostAlunoModal>
      </div>
    </div>
  </div> 
  
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from "../stores";
import PostAlunoModal from '@/components/PostAlunoModal.vue';


interface State {
  usuario?: number;
  senha?: string;
}

export default {
  name: 'login',
  components: { PostAlunoModal },

  
  setup() {
    
    const authStore = useAuthStore();

    const state = reactive<State>({
      usuario: undefined,
      senha: undefined
    });  

    const botaoAluno = "aluno";
      
    const loginUser = () => {  
            
      authStore.loginUser(state.usuario, state.senha);
            
    };
    
    
    return {
      botaoAluno,
      state,
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
