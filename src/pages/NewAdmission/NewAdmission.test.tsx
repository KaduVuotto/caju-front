import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewAdmission } from "./NewAdmission";
import { useNewAdmission } from "~/hooks/useNewAdmission";

jest.mock("~/hooks/useNewAdmission");

jest.mock("react-toastify/dist/ReactToastify.css");

const mockUseNewAdmission = useNewAdmission as jest.MockedFunction<
  typeof useNewAdmission
>;

describe("NewAdmission component", () => {
  beforeEach(() => {
    mockUseNewAdmission.mockReturnValue({
      goToHome: jest.fn(),
      handleClickOpen: jest.fn(),
      handleClose: jest.fn(),
      handleConfirm: jest.fn(),
      loadingScreen: false,
      openDialog: false,
    });
  });

  it("renders the form fields correctly", () => {
    render(<NewAdmission />);

    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByText(/Data de admissão/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  });

  it("shows loading screen when loadingScreen is true", () => {
    mockUseNewAdmission.mockReturnValue({
      goToHome: jest.fn(),
      handleClickOpen: jest.fn(),
      handleClose: jest.fn(),
      handleConfirm: jest.fn(),
      loadingScreen: true,
      openDialog: false,
    });

    render(<NewAdmission />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("opens dialog on handleClickOpen", async () => {
    mockUseNewAdmission.mockReturnValue({
      goToHome: jest.fn(),
      handleClickOpen: jest.fn(),
      handleClose: jest.fn(),
      handleConfirm: jest.fn(),
      loadingScreen: false,
      openDialog: true, // Dialog is open
    });

    render(<NewAdmission />);

    expect(
      screen.getByText(/Tem certeza que deseja realizar o cadastro/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Confirmar/i)).toBeInTheDocument();
  });
});
