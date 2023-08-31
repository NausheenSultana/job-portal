import React from "react";
import { render, screen, textMatcher } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FreelancerProfile from "../views/FreelancerProfilePage";

jest.mock("../data/employee.json", () => [
  {
    employee_id: "1",
    name: "John Doe",
    skills: ["React", "Node.js"],
    salary: "$60,000",
    location: "New York",
    experience: "3 years",
    phone_number: "123-456-7890",
    email_id: "john@example.com",
  },
]);

test("renders profile data when valid aid is provided", () => {
  // Set up a test route with a valid aid
  render(
    <MemoryRouter initialEntries={["/profile/emp1/pid10"]}>
      <Routes>
        <Route
          path="/profile/:aid/:pid"
          element={<FreelancerProfile />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );
  const { getByText } = render(<FreelancerProfile />);
  const headerElement = getByText("Name:");

  expect(headerElement).toBeInTheDocument();

  //   expect(
  //     screen
  //       .getByText((content, element) => textMatcher("Name:", element))
  //       .toBeInTheDocument()
  //   );

  // Assert that the label is present
  const nameLabel = screen.getByText((content, element) => {
    // Check if the element is a <div> and contains "Name:"
    return element.tagName.toLowerCase() === "div" && content.includes("Name:");
  });

  // Assert that the label is present
  expect(nameLabel).toBeInTheDocument();
  //  expect(
  //    screen.getByText((content, element) => textMatcher("John Doe", element))
  //  ).toBeInTheDocument();
  // Assert that the profile data is rendered
  //   expect(screen.getByText("Name:")).toBeInTheDocument();
  //   expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Skills:")).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Node.js")).toBeInTheDocument();
  expect(screen.getByText("Current Salary:")).toBeInTheDocument();
  expect(screen.getByText("$60,000")).toBeInTheDocument();
  expect(screen.getByText("Current Location:")).toBeInTheDocument();
  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Total Experience:")).toBeInTheDocument();
  expect(screen.getByText("3 years")).toBeInTheDocument();
  expect(screen.getByText("Phone:")).toBeInTheDocument();
  expect(screen.getByText("123-456-7890")).toBeInTheDocument();
  expect(screen.getByText("Email:")).toBeInTheDocument();
  expect(screen.getByText("john@example.com")).toBeInTheDocument();
});

// test('renders "Profile not found" when aid is not found', () => {

//   }

// Assert that the profile data is rendered using the custom text matcher

// Set up a test route with an invalid aid
//   render(
//     <MemoryRouter initialEntries={["/profile/999/123"]}>
//       <Route path="/profile/:aid/:pid">
//         <FreelancerProfile />
//       </Route>
//     </MemoryRouter>
//   );
// Assert that the "Profile not found" message is rendered
//   expect(screen.getByText("Profile not found for ID:")).toBeInTheDocument();
