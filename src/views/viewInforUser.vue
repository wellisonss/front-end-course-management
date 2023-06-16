<template> 
  <button @click="authStore.logout" class="absolute top-0 right-0 mt-4 mr-4 flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded">
    <span>Sair</span>
  </button>
<div v-if="user?.TIPO === 3" class="grid grid-cols-3 gap-2 p-4">
    <InforAluno />
    <Matricula />
    <DisciplinasDoUsuario />
</div>

    <div v-if="user?.TIPO === 2" class="grid grid-cols-3 gap-2 p-4">
    <InforProfessor />
    <DisciplinasDisponiveis />
</div>
</template>

<script lang="ts">

import InforAluno from "@components/InforAluno.vue";
import InforProfessor from "@components/InforProfessor.vue";
import Matricula from "@components/Matricula.vue"
import DisciplinasDoUsuario from "@components/DisciplinasDoUsuario.vue"
import DisciplinasDisponiveis from "@components/DisciplinasDisponiveis.vue"

import { useAuthStore } from "../stores"
import { storeToRefs } from "pinia"

export default {
    
    components: { 
        InforAluno,
        InforProfessor,
        Matricula,
        DisciplinasDoUsuario,
        DisciplinasDisponiveis
    },
    
    setup() {
        
        const authStore = useAuthStore();
        
        const { user } = storeToRefs(authStore);
        
        return {
            user,
            authStore
        };
    }
    
}

</script>

<style scoped>
</style>
