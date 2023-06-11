<template>
  <div class="w-full col-span-1 relative lg:h-[60vh] h-[45vh] m-auto rounded-md shadow-md rounded-lg bg-white overflow-scroll">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Curso</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50" v-for="(item, index) in DisciplinasUser" :key="index">
          <td class="px-6 py-4">{{ item.NOME }}</td>
          <td class="px-6 py-4">{{ item.CURSO }}</td>
          <td class="px-6 py-4"></td>
        </tr>
      </tbody>
    </table>

    <div class="p-4"></div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "../stores";
import { storeToRefs } from "pinia";

export default {
  name: 'DisciplinasDoUsuario',


  setup() {
    const mainStore = useMainStore();
    const { DisciplinasUser } = storeToRefs(mainStore);


    return {
      DisciplinasUser,
      mainStore,
    };
  }
}
</script>

<style scoped>
</style>
