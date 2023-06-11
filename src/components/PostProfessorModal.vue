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
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="curso" v-model="state.email" placeholder="email">
              </div>
  
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Siaep</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="email" v-model="state.siaep" placeholder="siaep">
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Departamento</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="email" v-model="state.departamento" placeholder="departamento">
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Número</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="matricula" v-model="state.numero" placeholder="Número">
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Senha</label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="matricula" v-model="state.senha" placeholder="insira a senha">
              </div>
              
              <button class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="insertProfessor()"> Adicionar </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { postProfessorApi, getProfessorApi } from "../providers";
  import { useMainStore } from "../stores"

  interface State {
  nome: string;
  email: string;
  senha: string;
  numero?: number;
  siaep?: number;
  departamento: string;
  showModal: boolean;
}

  
  export default {
    name: 'PostProfessorModal',
    props: ['nomeBotao'],
  
    setup() {

      const mainStore = useMainStore();
       
      const state = reactive<State>({
      nome: '',
      email: '',
      senha: '',
      departamento: '',
      numero: undefined,
      siaep: undefined,
      showModal: false,
    });

    
      const setModal = ( isOpen: boolean ) => {  
        
        state.nome = '';
        state.email = '';
        state.senha = '';
        state.departamento = '';
        state.numero = undefined;
        state.siaep = undefined;
  
        state.showModal = isOpen;
      };
  
      const insertProfessor =  async() => {

        // insere um novo aluno
        await postProfessorApi({
          ID: "",
          NOME: state.nome,
          DEPARTAMENTO: state.departamento,
          EMAIL: state.email,
          SENHA: state.senha,
          NUMERO: state.numero,
          SIAEP: state.siaep
        });

        const professores = await getProfessorApi();

        mainStore.setProfessores(professores);
        // criar um setAlunos

        setModal(false);  

      }
  
  
      return {
        insertProfessor,
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
  