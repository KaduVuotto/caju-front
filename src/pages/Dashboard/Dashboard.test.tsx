import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dashboard } from "./Dashboard";
import { useDashboard } from "~/hooks/useDashboard";

jest.mock("~/hooks/useDashboard");

jest.mock("react-toastify/dist/ReactToastify.css");

const mockUseDashboard = useDashboard as jest.MockedFunction<
  typeof useDashboard
>;

describe("Dashboard component", () => {
  beforeEach(() => {
    mockUseDashboard.mockReturnValue({
      cpf: "",
      cpfIsValid: false,
      dataRegistrations: [],
      errorCpf: "",
      errorRegistrations: "",
      goToNewAdmissionPage: jest.fn(),
      handleCloseDialog: jest.fn(),
      handleConfirmButton: jest.fn(),
      handleCpf: jest.fn(),
      handleOpenDialog: jest.fn(),
      loadingRegistrations: false,
      loadingScreen: false,
      openDialog: false,
      refresh: jest.fn(),
      searchCpf: jest.fn(),
      textDialog: "",
    });
  });

  it("renders the dashboard with search and admission buttons", () => {
    render(<Dashboard />);

    expect(
      screen.getByPlaceholderText(/Digite aqui um CPF/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Nova Admissão/i)).toBeInTheDocument();
  });

  it("shows error message when errorCpf is present", () => {
    mockUseDashboard.mockReturnValue({
      ...mockUseDashboard(),
      errorCpf: "Invalid CPF",
    });

    render(<Dashboard />);

    expect(screen.getByText(/Invalid CPF/i)).toBeInTheDocument();
  });

  it("opens dialog on handleClickOpen", async () => {
    mockUseDashboard.mockReturnValue({
      ...mockUseDashboard(),
      openDialog: true,
      textDialog: "Are you sure you want to proceed?",
    });

    render(<Dashboard />);

    expect(
      screen.getByText(/Are you sure you want to proceed/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Confirmar/i)).toBeInTheDocument();
  });
});
