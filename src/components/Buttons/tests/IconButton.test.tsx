import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "../IconButton";
import "@testing-library/jest-dom";

jest.mock("../styles", () => ({
  IconButton: jest
    .fn()
    .mockImplementation(({ children, ...props }) => (
      <button {...props}>{children}</button>
    )),
}));

describe("IconButton component", () => {
  it("renders children correctly", () => {
    render(<IconButton>Click Me</IconButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders as disabled when disabled is true", () => {
    render(<IconButton disabled={true}>Click Me</IconButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("renders as enabled when disabled is false", () => {
    render(<IconButton disabled={false}>Click Me</IconButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeEnabled();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick}>Click Me</IconButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <IconButton disabled={true} onClick={handleClick}>
        Click Me
      </IconButton>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
