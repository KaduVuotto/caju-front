import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  it("renders children correctly", () => {
    render(<Header>My Header</Header>);

    const header = screen.getByText("My Header");
    expect(header).toBeInTheDocument();
  });

  it("applies passed props correctly", () => {
    render(
      <Header className="test-class" id="test-id">
        My Header
      </Header>
    );

    const header = screen.getByText("My Header");
    expect(header).toHaveClass("test-class");
    expect(header).toHaveAttribute("id", "test-id");
  });
});
