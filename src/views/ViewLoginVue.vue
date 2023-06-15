<style>
body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

<template>
  <div class="absolute inset-0 h-screen w-screen bg-red-900">
    <div class="img mb-10 mt-10 flex h-32 items-center justify-center">
      <img
        src="https://portais.ufma.br/PortalUfma/img/brasao-normal.png;jsessionid=8D65930992E753B8B6C2B861BF632CFD"
        alt="Brasão da ufma"
        class="h-24 w-24"
      />
    </div>
    <div
      class="mx-auto mt-5 w-full max-w-sm rounded-md bg-red-900 p-10 p-8 shadow-md"
    >
      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-white" for="usuario"
          >Usuario</label
        >
        <input
          class="my-4 w-full rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-red-500 transition duration-300 hover:bg-gray-400"
          type="number"
          id="usuario"
          name="name"
          v-model="state.usuario"
          placeholder="usuario"
        />
      </div>

      <div class="mb-4">
        <label class="mb-2 block text-sm font-bold text-white" for="senha"
          >Senha</label
        >
        <input
          class="my-4 w-full rounded-full bg-gray-200 px-4 py-2 text-sm font-bold text-red-500 transition duration-300 hover:bg-gray-400"
          type="text"
          id="senha"
          v-model="state.senha"
          placeholder="senha"
        />
      </div>

      <button
        class="my-4 w-full rounded-full bg-white px-3 py-1 text-xs font-bold text-red-500 transition duration-300 hover:bg-gray-400"
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
