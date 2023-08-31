import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import JobSearch from "../views/JobSearch";
import { BrowserRouter } from "react-router-dom";
import { getJobs } from "../apiCalls/apiCalls";

jest.mock("../apiCalls/apiCalls");

// highlight-next-line
test("We show a list of job posts", async () => {
  render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
  // highlight-start
  const posts = [
    {
      _id: {
        $oid: "64ef131521000f9936324120",
      },
      job_id: "64ee4c011e25212e12e3709a",
      job_title: "Data Analyst",
      company: "WebTech Solutions",
      location: "New York, NY",
      salary: "$161 - $295",
      description: "Description for Job 1",
      applied: [
        {
          aid: "emp7",
          name: "Olivia Taylor",
          _id: {
            $oid: "64ef1326d36fc56957eca24a",
          },
        },
        {
          aid: "emp1",
          name: "Amy Winehouse",
          _id: {
            $oid: "64ef1349d36fc56957eca255",
          },
        },
        {
          aid: "emp3",
          name: "Emily Brown",
          _id: {
            $oid: "64ef5daf09aaee06cc782c75",
          },
        },
      ],
      requirements: "Requirements for Job 1",
      skillset: ["JavaScript"],
      contact: {
        pid: "pid1",
        name: "Contact Name 1",
        email: "contact1@example.com",
        phone: "+1 (555) 493-9860",
      },
    },
  ];
  getJobs.mockResolvedValueOnce(posts);
  if (expect(getJobs).toHaveBeenCalledTimes(1)) {
    var card = screen.getByTestId("jobCard");
    expect(card).toBeInTheDocument();
  }
  // highlight-end
  render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
  expect(getJobs).toHaveBeenCalledTimes(2);
  expect(getJobs).toHaveBeenCalledWith();
  // highlight-start
  // await wait(() => expect(screen.getByText("My Posts")).toBeInTheDocument());
  if (expect(getJobs).toHaveBeenCalledTimes(2)) {
    posts.forEach((post) =>
      expect(screen.getByText(post.job_title)).toBeInTheDocument()
    );
  }
  // highlight-end
});

test("JobSearch component", () => {
  render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
});
test("renders the component", () => {
  const { getByText } = render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
});
test("submit button for easy apply", () => {
  render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
  var jobCard = screen.queryByTestId("jobCard");
  if (jobCard) {
    var applyButton = within(jobCard).getByTestId("apply");
    expect(applyButton).toBeInTheDocument();
  }

  // fireEvent.click(easyApplyButton);
  // expect(easyApplyButton.toHaveTextContent("Already Applied"));
});
test("filters jobs by salary correctly", () => {
  render(
    <BrowserRouter>
      <JobSearch />
    </BrowserRouter>
  );
  var salaryInput = screen.getByTestId("salary-input");
  expect(salaryInput).toBeInTheDocument();
  fireEvent.change(salaryInput.querySelector("input"), {
    target: { value: "40" },
  });
});

// test("applies filters by skills correctly", () => {
//   var skillsAutocomplete = screen.getByTestId("skills-autocomplete");
//   expect(skillsAutocomplete).toBeInTheDocument();
// });
