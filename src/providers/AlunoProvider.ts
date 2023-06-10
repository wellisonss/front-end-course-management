import { api } from "./api";
import { IAluno } from "@/Interfaces/IAluno"

const getAlunoApi = async (): Promise<IAluno[]> => {
    const response = await api.get("/aluno");
    return response.data;
};

const postAlunoApi = async (aluno: IAluno): Promise<IAluno> => {

    const response = await api.post("/aluno", {
      NOME: aluno.NOME,
      SENHA: aluno.SENHA,
      MATRICULA: aluno.MATRICULA,
      CURSO: aluno.CURSO,
      EMAIL: aluno.EMAIL,
    });
    return response.data;

};

const deleteAlunoApi = async (id: string): Promise<void> => {
    await api.delete(`/aluno/${id}`);
};

const updateAlunoApi = async (aluno: IAluno): Promise<void> => {
    await api.put(`/aluno/${aluno.ID}`, {
      NOME: aluno.NOME,
      CURSO: aluno.CURSO,
      EMAIL: aluno.EMAIL,
      SENHA: aluno.SENHA
    });

};

export { getAlunoApi, postAlunoApi, deleteAlunoApi, updateAlunoApi };
