<template>
 
  <!-- modal -->
  <div>
     <button class="flex items-center justify-center shadow-md m-5 w-32 block border-blue-600 border-3 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white " @click="openModal">Adicionar</button>
      <div v-if="showModal" class="modal">
        <div class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md p-10 m-16">
          <span class="close" @click="closeModal">&times;</span>
          <slot>
            <div class="mb-4" >
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  type="text" id="name" name="name" v-model="nome" placeholder="nome do aluno">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="matricula" v-model="senha" placeholder="nova senha">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Curso</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="curso" v-model="curso" placeholder="curso">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email" id="email" v-model="email" placeholder="email do aluno">
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Matricula</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="matricula" v-model="matricula" placeholder="matricula do aluno">
              </div>
              
              <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="postAluno()">Adicionar</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { api } from "../providers";
  import { ref } from 'vue';
  import { useMainStore } from "../stores"

  
  export default {
    name: 'PostModal',
  
    setup() {

      const mainStore = useMainStore();
  
      const nome = ref("");
      const curso = ref("");
      const senha = ref("");
      const email = ref("");  
      const matricula =ref(null);
      const showModal = ref(false);

    
      const openModal = () => {  
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      const postAluno = async () => {
  
        await api.post("aluno/", {
          NOME: nome.value,
          CURSO: curso.value,
          EMAIL: email.value,
          SENHA: senha.value,
          MATRICULA: matricula.value
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
  
        mainStore.getAlunos();

        closeModal();  
  
     };
    
      return {
        postAluno,
        openModal,
        closeModal,
        showModal,
        nome,
        senha,
        curso,
        email,
        matricula
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
  