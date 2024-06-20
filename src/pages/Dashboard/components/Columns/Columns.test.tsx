import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Columns } from "./Columns";
import { DataRegistrationsItem } from "~/types/interface";
import { RegistrationStatus } from "~/types/emuns";

const mockRegistrations: DataRegistrationsItem[] = [
  {
    id: "1",
    employeeName: "John Doe",
    email: "john.doe@example.com",
    admissionDate: "2023/01/01",
    status: RegistrationStatus.REVIEW,
    cpf: "81984546678",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    email: "jane.smith@example.com",
    admissionDate: "20230201",
    status: RegistrationStatus.APPROVED,
    cpf: "57231819630",
  },
  {
    id: "3",
    employeeName: "Alice Johnson",
    email: "alice.johnson@example.com",
    admissionDate: "20230301",
    status: RegistrationStatus.REPROVED,
    cpf: "64723584277",
  },
];

const handleOpenDialog = jest.fn();

describe("Columns component", () => {
  it("renders all columns with correct titles", () => {
    render(
      <Columns
        errorRegistrations=""
        handleOpenDialog={handleOpenDialog}
        loadingRegistrations={false}
        loadingScreen={false}
        registrations={mockRegistrations}
      />
    );

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
  });

  it("renders correct registration items in respective columns", () => {
    render(
      <Columns
        errorRegistrations=""
        handleOpenDialog={handleOpenDialog}
        loadingRegistrations={false}
        loadingScreen={false}
        registrations={mockRegistrations}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });
});
