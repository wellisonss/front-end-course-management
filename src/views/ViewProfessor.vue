<script setup lang="ts">
import TableProfessorVue from "@components/TableProfessor.vue";
import PostProfessorModalVue from "@/components/PostProfessorModal.vue";
</script>

<template> 
    <TableProfessorVue />
    <PostProfessorModalVue class="flex items-center justify-center shadow-md m-5 w-32 block border-blue-600 border-3 rounded-full px-4 py-2" nome-botao="Adicionar" />
</template>

<style scoped>
</style>
