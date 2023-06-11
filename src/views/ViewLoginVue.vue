<template>
  <body>
    <div class="img">
      <img
        src="https://portais.ufma.br/PortalUfma/img/brasao-normal.png;jsessionid=8D65930992E753B8B6C2B861BF632CFD"
        alt="Brasão da ufma"
      />
    </div>
    <div class="container">
      <div class="card">
        <div class="label-float">
          <p>E-mail:</p>
          <input
            type="text"
            id="usuario"
            v-model="state.usuario"
            placeholder=""
            required
          />
        </div>
        <div class="label-float">
          <p>Senha:</p>
          <input
            type="password"
            id="senha"
            v-model="state.senha"
            placeholder=""
            required
          />
          <i class="fa fa-eye" aria-hidden="true"></i>
        </div>
        <div class="justify-center">
          <button @click="loginUser()">Entrar</button>
        </div>

        <div class="container-link">
          <span>Cadastre-se: </span>
          <PostAlunoModal nome-botao=" Aluno "></PostAlunoModal>,
          <PostProfessorModal nome-botao="Professor "></PostProfessorModal>
        </div>
      </div>
    </div>
  </body>
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
* {
  margin: 0;
  padding: 0;
  font-family: "Kanit", sans-serif;
}

body {
  background-color: #952020;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
img {
  width: 100px;
  height: 100px;
  margin-top: 300px;
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 150px;
}

input {
  width: 350px;
  background-color: rgb(233, 228, 222);
  padding: 9px;
  border-radius: 17px;
  border: none;
  margin-top: 9px;
  margin-bottom: 10px;
}

p {
  color: rgb(233, 228, 222);
}

.justify-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.justify-center {
  margin-bottom: 10px;
}
button {
  padding: 5px;
  width: 110px;
  border-radius: 20px;
  border: none;
  font-size: 20px;
  color: #952020; /* Altera a cor do texto para vermelho */
  background-color: #fff; /* Altera a cor de fundo para branco */
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.4s ease-out;
}

button:hover {
  background-color: bisque;
  color: #fff;
}

.container-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  margin-top: 20px;
  font-family: sans-serif;
}
</style>
