import { RegistrationStatus } from "~/types/emuns";
import { DataRegistrationsItem } from "~/types/interface";

export const itemMock: DataRegistrationsItem = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  status: RegistrationStatus.APPROVED,
  cpf: "56642105087",
  id: "3",
};

export const mockCpf = "566.421.050-87";
