import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for better assertion messages
import SearcherProfile from "../views/MyProfile"; // Import your component

// Mock any dependencies or context (if needed)

describe("SearcherProfile Component", () => {
  it("renders with initial data", () => {
    // Create a mock profileData to pass as props
    const mockProfileData = {
      name: "John Doe",
      git_url: "https://github.com/johndoe",
      experience: "5",
    };

    render(<SearcherProfile />, {
      // Mock useParams() to return an ID
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/search/123"]}>{children}</MemoryRouter>
      ),
      route: "/search/123",
    });

    // Assert that the component renders your initial data
    expect(screen.getByLabelText("Name")).toHaveValue(mockProfileData.name);
    expect(
      screen.getByLabelText("Add the link to your GitHub profile")
    ).toHaveValue(mockProfileData.git_url);
    expect(screen.getByLabelText("Total work experience in years")).toHaveValue(
      mockProfileData.experience
    );

    // Add more assertions as needed
  });

  it("validates GitHub profile link", () => {
    render(<SearcherProfile />);

    // Mock the input change for the GitHub profile link
    fireEvent.change(
      screen.getByLabelText("Add the link to your GitHub profile"),
      {
        target: { value: "invalid-link" },
      }
    );

    // Assert that an error message is displayed
    expect(
      screen.getByText("Invalid GitHub profile link", { exact: false })
    ).toBeInTheDocument();

    // Mock a valid GitHub profile link
    fireEvent.change(
      screen.getByLabelText("Add the link to your GitHub profile"),
      {
        target: { value: "https://github.com/validusername" },
      }
    );

    // Assert that the error message is not displayed
    expect(
      screen.queryByText("Invalid GitHub profile link", { exact: false })
    ).not.toBeInTheDocument();

    // Add more assertions as needed
  });

  // Add more test cases for other components
});
