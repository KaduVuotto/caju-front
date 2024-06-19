import { api } from "./axios";

export const getAllAdmissions = async () => {
  try {
    const response = await api.get("registrations");
    return response.data;
  } catch (err) {
    throw err;
  }
};
