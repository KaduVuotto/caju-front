import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const getCpf = async (cpf: string) => {
  try {
    const response = await api.get<DataRegistrationsItem[]>(
      `registrations?cpf=${cpf.replace(/\D/g, "")}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
