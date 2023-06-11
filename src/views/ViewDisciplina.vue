<script setup lang="ts">
import TableDisciplinaVue from "@components/TableDisciplina.vue";
import PostDisciplinaModalVue from "@/components/PostDisciplinaModal.vue";
</script>

<template> 
    <TableDisciplinaVue />
    <PostDisciplinaModalVue class="flex items-center justify-center shadow-md m-5 w-32 block border-blue-600 border-3 rounded-full px-4 py-2" nome-botao="Adicionar"/>
</template>

<style scoped>
</style>
