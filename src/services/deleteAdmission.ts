import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const deleteAdmission = async (item: DataRegistrationsItem) => {
  try {
    const response = await api.delete(`/registrations/${item.id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting status:", err);
    throw err;
  }
};
