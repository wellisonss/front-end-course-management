import { api } from "./api";
import { IAluno } from "@/Interfaces/IAluno"

const getAlunoApi = async (): Promise<IAluno[]> => {
  try {
    const response = await api.get("/aluno");
    return response.data;
  } catch (error) {
      throw error; 
  }
};

const postAlunoApi = async (aluno: IAluno): Promise<IAluno> => {

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
    throw error;
  }
};

const deleteAlunoApi = async (id: string): Promise<void> => {
  try {
    await api.delete(`/aluno/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateAlunoApi = async (aluno: IAluno): Promise<void> => {
  try {
    await api.put(`/aluno/${aluno.ID}`, {
      NOME: aluno.NOME,
      CURSO: aluno.CURSO,
      EMAIL: aluno.EMAIL,
      SENHA: aluno.SENHA
    });
  } catch (error) {
     throw error;
  }
};

export { getAlunoApi, postAlunoApi, deleteAlunoApi, updateAlunoApi };
