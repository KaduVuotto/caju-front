import { RegistrationStatus } from "~/types/emuns";
import { DataRegistrationsItem } from "~/types/interface";

export const initialStateRegistration: DataRegistrationsItem[] = [
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.REVIEW,
    cpf: "",
    id: "",
  },
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.APPROVED,
    cpf: "",
    id: "",
  },
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.REPROVED,
    cpf: "",
    id: "",
  },
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.REVIEW,
    cpf: "",
    id: "",
  },
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.APPROVED,
    cpf: "",
    id: "",
  },
  {
    admissionDate: "",
    email: "",
    employeeName: "",
    status: RegistrationStatus.REPROVED,
    cpf: "",
    id: "",
  },
];
