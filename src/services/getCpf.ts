import { api } from "./axios";

export const getCpf = async (cpf: string) => {
  try {
    const response = await api.get(`registrations?cpf=${cpf.replace(/\D/g, '')}`);
    console.log('response', response)
    return response.data;
  } catch (err) {
    console.error("Error get cpf:", err);
    throw err;
  }
};
