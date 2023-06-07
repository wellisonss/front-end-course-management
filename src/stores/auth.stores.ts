import router from '../routes/router'
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

        this.user = response.data.user;
        this.token = response.data.token;

        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);
      })
      .catch((error) => console.log(error));

      if(this.token){
        router.push("/");
      }
      
    },

    async checkToken( ) {
      try {
        const tokenUser = "Bearer " + this.token;

        const { data } = await api.get("/verify", {
          headers: {
            Authorization: tokenUser
          }
        });
        
        return data;

      } catch (error: any) {
        console.log(error.response.data)
        
      }
    }

    

  }
})
