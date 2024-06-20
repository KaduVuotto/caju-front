import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders skeleton when loading is true", () => {
    render(<Button loading={true} />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: "5vw", height: "5vh" });
  });

  it("renders Styled.Button with no click action when disabled is true", () => {
    render(<Button disabled={true} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // No onClick handler should be called
  });

  it("renders Styled.ButtonSmall when small is true", () => {
    render(<Button small={true} bgColor="#000" color="#fff" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: "#000", color: "#fff" });
  });

  it("triggers onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
