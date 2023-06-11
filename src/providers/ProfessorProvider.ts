import { api } from "./api";
import { IProfessor } from "@/Interfaces/IProfessor"

const getProfessorApi = async (): Promise<IProfessor[]> => {
    const response = await api.get("/professor");
    return response.data;
};

const postProfessorApi = async (professor: IProfessor): Promise<IProfessor> => {

    const response = await api.post("/professor", {
      NOME: professor.NOME,
      EMAIL: professor.EMAIL,
      SIAEP: professor.SIAEP,
      NUMERO: professor.NUMERO,
      DEPARTAMENTO: professor.DEPARTAMENTO,
      SENHA: professor.SENHA,
    });
    return response.data;

};

const deleteProfessorApi = async (id: string): Promise<void> => {
    await api.delete(`/professor/${id}`);
};

const updateProfessorApi = async (professor: IProfessor): Promise<void> => {
    await api.put(`/professor/${professor.ID}`, {
      NOME: professor.NOME,
      EMAIL: professor.EMAIL,
      SIAEP: professor.SIAEP,
      NUMERO: professor.NUMERO,
      DEPARTAMENTO: professor.DEPARTAMENTO,
      SENHA: professor.SENHA,
    });

};

export { getProfessorApi, postProfessorApi, deleteProfessorApi, updateProfessorApi };
