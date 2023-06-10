import { api } from "./api";
import { Aluno } from "@/Interfaces/aluno"

const getAlunoApi = async (): Promise<Aluno[]> => {
  try {
    const response = await api.get("/aluno");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const postAlunoApi = async (aluno: Aluno): Promise<Aluno> => {
  try {
    const response = await api.post("/aluno", {
      NOME: aluno.NOME,
      SENHA: aluno.SENHA,
      MATRICULA: aluno.MATRICULA,
      CURSO: aluno.CURSO,
      EMAIL: aluno.EMAIL,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAlunoApi = async (id: string): Promise<void> => {
  try {
    await api.delete(`/aluno/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAlunoApi = async (aluno: Aluno): Promise<void> => {
  try {
    await api.put(`/aluno/${aluno.ID}`, {
      NOME: aluno.NOME,
      CURSO: aluno.CURSO,
      EMAIL: aluno.EMAIL,
      SENHA: aluno.SENHA
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getAlunoApi, postAlunoApi, deleteAlunoApi, updateAlunoApi };
