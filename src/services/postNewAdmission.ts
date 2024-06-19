import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const postNewAdmission = async (item: DataRegistrationsItem) => {
  try {
    const response = await api.post(`/registrations`, item);
    return response.data;
  } catch (err) {
    console.error("Error updating status:", err);
    throw err;
  }
};
