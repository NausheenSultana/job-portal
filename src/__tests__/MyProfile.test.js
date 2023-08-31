import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyProfile from "../views/MyProfile";
import { BrowserRouter } from "react-router-dom";
import freelancers from "../data/freelancers.json";

jest.mock("../data/freelancers.json");

test("MyProfile Component", () => {
  render(
    <BrowserRouter>
      <MyProfile />
    </BrowserRouter>
  );
  const posts = [
    {
      employee_id: "emp2",
      password: "aferns",
      name: "Michael Johnson",
      skills: ["Java", "C++", "SQL", "Spring Boot"],
      salary: "60LPA",
      location: "Mumbai",
      experience: "5",
      phone_number: "+91 (XXX) XXX-XXXX",
      email_id: "michael.johnson@example.com",
      git_url: "https://github.com/barchart",
    },
  ];
  freelancers.mockResolvedValueOnce(posts);
  expect(freelancers).toHaveBeenCalledTimes(1);
  expect(freelancers).toHaveBeenCalledWith();
  //   render(<MyProfile />, {
  //     wrapper: ({ children }) => (
  //       <BrowserRouter initialEntries={["/search/123"]}>{children}</BrowserRouter>
  //     ),
  //     route: "/search/123",
  //   });
  var gitLink = screen.getByTestId("githubProfile");
  expect(
    screen.queryByText("Invalid GitHub profile link", { exact: false })
  ).toBeInTheDocument();

  fireEvent.change(gitLink.querySelector("input"), {
    target: { value: "https://github.com/validusername" },
  });
});

test("renders with initial data", () => {
  render(
    <BrowserRouter>
      <MyProfile />
    </BrowserRouter>
  );
  const mockProfileData = {
    name: "John Doe",
    git_url: "https://github.com/barchart",
    experience: "5",
  };
  var nameField = screen.getByTestId("nameField");
  expect(nameField).toBeInTheDocument();
  // expect(nameField).toHaveValue(expect.stringMatching(/(?=.*John)(?=.*Doe)/));

  expect(
    screen.getByLabelText("Add the link to your GitHub profile")
  ).toBeInTheDocument();
  //       .toHaveValue(
  //     expect.stringMatching(/^https:\/\/github.com\/[A-Za-z0-9_-]+$/)
  //   );
  if (expect(freelancers).toHaveBeenCalledTimes(1)) {
    expect(screen.getByLabelText("Total work experience in years")).toHaveValue(
      expect.any(Number)
    );
  }
});
test("validates GitHub profile link", () => {
  render(
    <BrowserRouter>
      <MyProfile />
    </BrowserRouter>
  );
  var gitLink = screen.getByTestId("githubProfile");
  expect(gitLink).toBeInTheDocument();
  fireEvent.change(gitLink.querySelector("input"), {
    target: { value: "invalid-link" },
  });
});
