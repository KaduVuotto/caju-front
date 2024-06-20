import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegistrationCard } from "./RegistrationCard";
import { DialogFrom, RegistrationStatus } from "~/types/emuns";
import { itemMock } from "~/services/tests/mocks/itemMock";
import "@testing-library/jest-dom";

const mockProps = {
  errorRegistrations: "",
  handleOpenDialog: jest.fn(),
  item: itemMock,
  loadingRegistrations: false,
};

describe("RegistrationCard component", () => {
  it("renders employee name, email, and admission date", () => {
    render(<RegistrationCard {...mockProps} />);

    expect(screen.getByText("Luiz Filho")).toBeInTheDocument();
    expect(screen.getByText("luiz@caju.com.br")).toBeInTheDocument();
    expect(screen.getByText("22/10/2023")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    const { rerender } = render(<RegistrationCard {...mockProps} />);

    expect(screen.getByText(/Revisar novamente/i)).toBeInTheDocument();
    expect(screen.getByText(/Reprovar/i)).toBeInTheDocument();
    expect(screen.getByText(/Excluir/i)).toBeInTheDocument();

    rerender(
      <RegistrationCard
        {...mockProps}
        item={{ ...mockProps.item, status: RegistrationStatus.REPROVED }}
      />
    );
    expect(screen.getByText(/Aprovar/i)).toBeInTheDocument();
  });

  it("calls handleOpenDialog with correct parameters when action buttons are clicked", () => {
    render(<RegistrationCard {...mockProps} />);

    fireEvent.click(screen.getByText(/Revisar novamente/i));
    expect(mockProps.handleOpenDialog).toHaveBeenCalledWith(
      DialogFrom.STATUS,
      itemMock,
      RegistrationStatus.REVIEW
    );

    fireEvent.click(screen.getByText(/Reprovar/i));
    expect(mockProps.handleOpenDialog).toHaveBeenCalledWith(
      DialogFrom.STATUS,
      itemMock,
      RegistrationStatus.REPROVED
    );

    fireEvent.click(screen.getByText(/Excluir/i));
    expect(mockProps.handleOpenDialog).toHaveBeenCalledWith(
      DialogFrom.DELETE,
      itemMock
    );
  });

  it("displays error message when provided", () => {
    const propsWithError = {
      ...mockProps,
      errorRegistrations: "Error message",
    };
    render(<RegistrationCard {...propsWithError} />);

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders skeleton while loading", () => {
    const propsLoading = { ...mockProps, loadingRegistrations: true };
    render(<RegistrationCard {...propsLoading} />);

    expect(screen.getByTestId("skeleton-h5")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton-body1")).toHaveLength(2);
  });
});
