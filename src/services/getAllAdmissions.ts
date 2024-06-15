import { api } from "./axios";

export const getAllAdmissions = async () => {
  try {
    const response = await api.get("registrations");
    return response.data;
  } catch (error) {
    console.error("Error get all admissions:", error);
    throw error;
  }
};
