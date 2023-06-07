<template>
<div class="overflow-hidden rounded-lg m-5">
  <div v-if="user?.TIPO === 1" class="border-b border-b-gray-200">
    <ul class="-mb-px flex items-center gap-4 text-sm font-medium">
      <RouterLink to="/professor">
        <li class="flex-1">
          <a class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-blue-700" :class="{ 'text-blue-700': selectedTab === 'professor' }" @click="selectedTab = 'professor'">
            Professor
          </a>
        </li>
      </RouterLink>

      <RouterLink to="/aluno" >
        <li class="flex-1">
          <a class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-blue-700" :class="{ 'text-blue-700': selectedTab === 'aluno' }" @click="selectedTab = 'aluno'">
            Aluno
          </a>
        </li>
      </RouterLink>

      <RouterLink to="/disciplina" >
        <li class="flex-1">
          <a class="flex items-center justify-center gap-2 px-4 py-3 text-gray-500 hover:text-blue-700" :class="{ 'text-blue-700': selectedTab === 'disciplina' }" @click="selectedTab = 'disciplina'">
            Disciplina
          </a>
        </li>
      </RouterLink>
    </ul>
  </div>
</div>

<RouterView />
</template>

<script lang="ts">
import { ref } from 'vue';

import { useAuthStore } from "./stores"
import { storeToRefs } from "pinia"

export default {
  setup() {

    const authStore = useAuthStore();

    const { user } = storeToRefs(authStore);

    const selectedTab = ref('');

    return {
      selectedTab,
      user
    };
  }

}
</script>

<style scoped>

</style>
