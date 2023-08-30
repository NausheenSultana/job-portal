import * as React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "../views/Login";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("Sign in", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  var textElem = screen.getByText(/Sign in/);
  expect(textElem).toBeInTheDocument();

  var container = screen.getByTestId("container");
  expect(container).toBeInTheDocument();
  var uid = screen.getByTestId("uid");
  expect(uid).toBeInTheDocument();
  fireEvent.change(uid.querySelector("input"), {
    target: { value: "example text" },
  });

  var pwd = screen.getByTestId("password");
  expect(pwd).toBeInTheDocument();
  fireEvent.change(pwd.querySelector("input"), {
    target: { value: "example text" },
  });
});

describe("Testing the log in component", () => {
  test("email input field should accept email", () => {});
});
// test("render the login with two buttons", async () => {
//   const buttonList = await screen.getByTestId("submit");
//   expect(buttonList).toHaveLength(1);
// });
