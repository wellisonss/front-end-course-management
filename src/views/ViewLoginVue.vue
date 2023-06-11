<template>
  <div>
    <div
      class="m-16 mx-auto w-full max-w-sm rounded-md bg-white p-10 p-8 shadow-md"
    >
      <div class="flex flex-col items-center space-y-3">
        <span class="font-semi-bold text-2xl leading-normal">Login</span>
      </div>

      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Usuario</label
        >
        <input
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          type="number"
          id="usuario"
          name="name"
          v-model="state.usuario"
          placeholder="usuario"
        />
      </div>

      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name"
          >Senha</label
        >
        <input
          class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          type="text"
          id="senha"
          v-model="state.senha"
          placeholder="senha"
        />
      </div>

      <button
        class="my-4 w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600"
        @click="loginUser()"
      >
        Entrar
      </button>
      <div class="w-full text-center">
        <span class="text-sm text-blue-600">Cadastre-se</span>
      </div>
      <div class="flex items-center justify-center">
        <PostAlunoModal class="px-1" nome-botao="Aluno "></PostAlunoModal>
        <PostProfessorModal
          class="px-1"
          nome-botao="Professor "
        ></PostProfessorModal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "../stores";
import PostAlunoModal from "@/components/PostAlunoModal.vue";
import PostProfessorModal from "@/components/PostProfessorModal.vue";

interface State {
  usuario?: number;
  senha?: string;
}

export default {
  name: "login",
  components: { PostAlunoModal, PostProfessorModal },

  setup() {
    const authStore = useAuthStore();

    const state = reactive<State>({
      usuario: undefined,
      senha: undefined,
    });

    const botaoAluno = "alddduno";

    const loginUser = () => {
      authStore.loginUser(state.usuario, state.senha);
    };

    return {
      botaoAluno,
      state,
      loginUser,
    };
  },
};
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
