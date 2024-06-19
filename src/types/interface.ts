import { Status } from "./types";

export interface DataRegistrationsItem {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: Status;
  cpf: string;
  id: string;
}

export interface FormNewAdmission {
  name: string;
  email: string;
  cpf: string;
  admissionDate: string;
}
