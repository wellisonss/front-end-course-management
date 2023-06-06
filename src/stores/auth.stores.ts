import { api } from '../providers'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  ID: string;
  USUARIO: number;
  SENHA: string;
  TIPO: number;
}

export type AuthStores = {
  user: User;
  token: string;
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    user: ref(JSON.parse(sessionStorage.getItem("user") || "null")),
    token: ref(sessionStorage.getItem("token")),
  } as unknown as AuthStores ),
  
  actions: {
    async loginUser (usuario: number, senha: string) {
      await api.post("/login", {
        USUARIO: usuario,
        SENHA: senha
      })
      .then((response) => {
        console.log(response);
        // this.user = response.data.user;
        // this.token = response.data.token;

        // Salvar o user e token no sessionStorage
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);
      })
      .catch((error) => console.log(error))
      
    },
  }
})
