import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const updateStatus = async (item: DataRegistrationsItem, newStatus: string) => {
  try {
    const response = await api.put(`/registrations/${item.id}`, {
      ...item,
      status: newStatus,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
