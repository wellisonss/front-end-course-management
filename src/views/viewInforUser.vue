<template> 
    <InforAluno v-if="user?.TIPO === 3" />
    <InforProfessor v-else-if="user?.TIPO === 2"/>
</template>

<script lang="ts">

import InforAluno from "@components/inforAluno.vue";
import InforProfessor from "@components/inforProfessor.vue";

import { useAuthStore } from "../stores"
import { storeToRefs } from "pinia"

export default {
    
    components: { 
        InforAluno,
        InforProfessor
    },
    
    setup() {
        
        const authStore = useAuthStore();
        
        const { user } = storeToRefs(authStore);
        
        return {
            user
        };
    }
    
}

</script>

<style scoped>
</style>
