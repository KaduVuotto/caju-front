import { api } from "./axios";

export const getAllAdmissions = async () => {
  try {
    const response = await api.get("registrations");
    return response.data;
  } catch (err) {
    console.error("Error get all admissions:", err);
    throw err;
  }
};
