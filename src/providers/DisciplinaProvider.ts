import { api } from "./api";
import { IDisciplina } from "@/Interfaces/IDisciplina"
import { IMatricula } from "@/Interfaces/IMatricula"

const getDisciplinaApi = async (): Promise<IDisciplina[]> => {
    const response = await api.get("/disciplina");
    return response.data;
};

const postDisciplinaApi = async (disciplina: IDisciplina): Promise<IDisciplina> => {

    const response = await api.post("/disciplina", {
      NOME: disciplina.NOME,
      CURSO: disciplina.CURSO,
      DESCRICAO: disciplina.DESCRICAO,
      COD_DISCIPLINA: disciplina.COD_DISCIPLINA
    });
    return response.data;

};

const deleteDisciplinaApi = async (id: string): Promise<void> => {
    await api.delete(`/disciplina/${id}`);
};

const updateDisciplinaApi = async (disciplina: IDisciplina): Promise<void> => {
    await api.put(`/disciplina/${disciplina.ID}`, {
      NOME: disciplina.NOME,
      CURSO: disciplina.CURSO,
      DESCRICAO: disciplina.DESCRICAO,
      COD_DISCIPLINA: disciplina.COD_DISCIPLINA
    });

};

const createMatricularApi = async (idDisciplina: string, idUsuario: string): Promise<void> => {
  await api.post("/turma", {
    ID_USUARIO: idUsuario,
    ID_DISCIPLINA: idDisciplina,
  });
}

  const getMatricularApi = async (): Promise<IMatricula[]> => {

    const response = await api.get("/turma");
    return response.data;

};

export { getDisciplinaApi, postDisciplinaApi, deleteDisciplinaApi, updateDisciplinaApi, createMatricularApi, getMatricularApi };
