import React from "react";
import {
  render,
  fireEvent,
  getByAltText,
  getByTestId,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toHaveTextContent
import JobSearch from "../views/JobSearch";

// Mock the axios module to prevent actual HTTP requests
jest.mock("axios");

describe("JobSearch component", () => {
  it("renders the component", () => {
    const { getByText } = render(<JobSearch />);
    const headerElement = getByText("India's No.1 Job Site");

    expect(headerElement).toBeInTheDocument();
    // Add more assertions as needed for other elements in the component
  });

  it("filters jobs by salary correctly", () => {
    const { getByTestId } = render(<JobSearch />);
    // Simulate changing the salary input
    const salaryInput = getByTestId("salary-input");
    fireEvent.change(salaryInput, { target: { value: "40" } });

    // Assert that the component responds correctly to salary filtering
    // Add assertions based on your component's behavior
  });

  it("applies filters by skills correctly", () => {
    const skillsAutocomplete = screen.getByTestId("skills-autocomplete");
    // Use fireEvent to select skills

    // Assert that the component responds correctly to skill filtering
    // Add assertions based on your component's behavior
  });

  it("handles easy apply correctly", () => {
    const easyApplyButton = screen.getByTestId("apply");
    fireEvent.click(easyApplyButton);
    expect(easyApplyButton.toHaveTextContent("Already Applied"));
  });
});
