import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const postNewAdmission = async (item: DataRegistrationsItem) => {
  try {
    const response = await api.post<DataRegistrationsItem>(`/registrations`, item);
    return response.data;
  } catch (err) {
    throw err;
  }
};
