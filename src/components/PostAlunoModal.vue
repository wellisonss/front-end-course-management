<template>
 
  <!-- modal -->
  <div>
     <a class="cursor-pointer flex justify-center itens-center text-sm w-full text-blue-500 hover:text-blue-600 transition duration-300" @click="setModal(true)"> {{ nomeBotao }}</a>
      <div v-if="state.showModal" class="modal">
        <div class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md p-10 m-16">
          <span class="close" @click="setModal(false)">&times;</span>
          <slot>
            <div class="mb-4" >
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  type="text" id="name" name="name" v-model="state.nome" placeholder="nome do aluno">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="matricula" v-model="state.senha" placeholder="nova senha">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Curso</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="curso" v-model="state.curso" placeholder="curso">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email" id="email" v-model="state.email" placeholder="email do aluno">
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Matricula</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="matricula" v-model="state.matricula" placeholder="matricula do aluno">
              </div>
              
              <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="insertAluno()"> Adicionar </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { postAlunoApi, getAlunoApi } from "../providers";
  import { useMainStore } from "../stores"

  interface State {
    nome: string,
    curso: string,
    senha?: number,
    email: string,
    matricula?: number,
    showModal: boolean
}

  
  export default {
    name: 'PostAlunoModal',
    props: ['nomeBotao'],
  
    setup() {

      const mainStore = useMainStore();
       
      const state =  reactive<State>({
        nome: "",
        curso: "",
        senha: undefined,
        email: "",
        matricula: undefined,
        showModal: false
      });

    
      const setModal = ( isOpen: boolean ) => {  
        
        state.nome = "";
        state.curso = "";
        state.senha = undefined;
        state.email = "";
        state.matricula = undefined;
  
        state.showModal = isOpen;
      };
  
      const insertAluno =  async() => {

        // insere um novo aluno
        await postAlunoApi({
          ID: "",
          NOME: state.nome,
          CURSO: state.curso,
          EMAIL: state.email,
          SENHA: state.senha,
          MATRICULA: state.matricula
        });

        const alunos = await getAlunoApi();

        mainStore.setAlunos(alunos);
        // criar um setAlunos

        setModal(false);  

      }
  
  
      return {
        insertAluno,
        setModal,
        state
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
  