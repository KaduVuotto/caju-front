import { DataListItem } from "~/types/interface";
import { api } from "./axios";

export const updateStatus = async (item: DataListItem, newStatus: string) => {
  try {
    const response = await api.put(`/registrations/${item.id}`, {
      ...item,
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
