import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../components/Header.js";

describe("Header component", () => {
  it("renders the header with the correct text", () => {
    const { getByText } = render(<Header />);
    const headerElement = getByText("India's No.1 Job Site");

    expect(headerElement).toBeInTheDocument();

    expect(headerElement).toHaveTextContent("India's No.1 Job Site");
  });

  it("applies the correct styles to the header", () => {
    const { getByText } = render(<Header />);
    const headerElement = getByText("India's No.1 Job Site");

    expect(headerElement).toHaveStyle("marginLeft: 150px");
    expect(headerElement).toHaveStyle("color: #fff");
    expect(headerElement).toHaveStyle("fontSize: 30px");
    expect(headerElement).toHaveStyle("fontStyle: italic");
  });

  it("handles responsive styles correctly", () => {
    const { getByText } = render(<Header />);
    const headerElement = getByText("India's No.1 Job Site");

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(max-width: 650px)",
    }));
  });
});
