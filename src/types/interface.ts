import { RegistrationStatus } from "./emuns";

export interface DataRegistrationsItem {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  id: string;
}

export interface FormNewAdmission {
  name: string;
  email: string;
  cpf: string;
  admissionDate: string;
}
