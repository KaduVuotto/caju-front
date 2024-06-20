import { DataRegistrationsItem } from "~/types/interface";
import { api } from "./axios";

export const getAllAdmissions = async () => {
  try {
    const response = await api.get<DataRegistrationsItem[]>("registrations");
    return response.data;
  } catch (err) {
    throw err;
  }
};
