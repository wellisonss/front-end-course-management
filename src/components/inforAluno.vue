<template> 
 <h1> {{ user?.USUARIO }}</h1>
</template>

<script lang="ts">

import { useAuthStore } from "../stores"
import { storeToRefs } from "pinia"

export default {
  
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
