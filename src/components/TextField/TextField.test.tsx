import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextField } from "./TextField";

describe("TextField component", () => {
  it("renders label correctly", () => {
    render(
      <TextField id="test-id" label="Test Label" value="" onChange={() => {}} />
    );

    const label = screen.getByText(/Test Label/i);
    expect(label).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <TextField
        id="error-id"
        label="Error Field"
        value=""
        error="Test Error"
        onChange={() => {}}
      />
    );

    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders input value correctly", () => {
    render(
      <TextField
        id="value-id"
        label="Value Field"
        value="test value"
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId("textfield");
    expect(input).toHaveValue("test value");
  });
});
