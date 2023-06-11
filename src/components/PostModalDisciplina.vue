<template>
  <!-- modal -->
  <div>
    <button
      class="border-3 m-5 block flex w-32 items-center justify-center rounded-full border-red-600 px-4 py-2 text-red-600 shadow-md hover:bg-red-600 hover:text-white focus:border-red-600 focus:outline-none"
      @click="openModalD"
    >
      Adicionar
    </button>
    <div v-if="showModalD" class="modal">
      <div
        class="m-16 mx-auto w-full max-w-sm rounded-md bg-white p-10 p-8 shadow-md"
      >
        <span class="close" @click="closeModalD">&times;</span>
        <slot>
          <div class="mb-4">
            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >Name</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="name"
                name="name"
                v-model="nome"
                placeholder="nome da disciplina"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >curso</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="curso"
                v-model="curso"
                placeholder="curso"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >descricao</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="text"
                id="descricao"
                v-model="descricao"
                placeholder="descricao"
              />
            </div>

            <div class="mb-4">
              <label
                class="mb-2 block text-sm font-bold text-gray-700"
                for="name"
                >código da disciplina</label
              >
              <input
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                type="number"
                id="descricao"
                v-model="codigo"
                placeholder="codigo"
              />
            </div>

            <button
              class="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-indigo-600"
              @click="postDisciplina()"
            >
              Adicionar
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from "../providers";
import { ref } from "vue";
import { useMainStore } from "../stores";

export default {
  name: "PostModalDisciplina",

  setup() {
    const mainStore = useMainStore();

    const nome = ref("");
    const curso = ref("");
    const descricao = ref("");
    const codigo = ref(null);
    const showModalD = ref(false);

    const openModalD = () => {
      showModalD.value = true;
    };

    const closeModalD = () => {
      showModalD.value = false;
    };

    const postDisciplina = async () => {
      await api
        .post("disciplina/", {
          NOME: nome.value,
          CURSO: curso.value,
          DESCRICAO: descricao.value,
          COD_DISCIPLINA: codigo.value,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      mainStore.getDisciplinas();

      closeModalD();
    };

    return {
      postDisciplina,
      openModalD,
      closeModalD,
      showModalD,
      nome,
      curso,
      descricao,
      codigo,
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
