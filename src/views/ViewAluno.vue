<template> 
    <TableAlunoVue />
    <PostAlunoModal class="flex items-center justify-center shadow-md m-5 w-32 block border-blue-600 border-3 rounded-full px-4 py-2" nome-botao="Adicionar"/>
</template>

<script setup lang="ts">
import TableAlunoVue from "@components/TableAluno.vue";
import PostAlunoModal from "@components/PostAlunoModal.vue";

</script>

<style scoped>
</style>
