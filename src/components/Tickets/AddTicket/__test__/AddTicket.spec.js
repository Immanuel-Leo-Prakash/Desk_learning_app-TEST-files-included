import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AddPost from "../index";
import "@testing-library/jest-dom";
import Home from "../../../Home/index";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../../utils/test-utils";
import { jest } from "@jest/globals";

it("should render the component and add a ticket", async () => {
  renderWithProviders(<AddPost />);
  screen.debug();
  // Fill in the form fields using userEvent
  await userEvent.type(screen.getByPlaceholderText("Full name"), "John Smith");
  await userEvent.type(
    screen.getByPlaceholderText("Email"),
    "johnsmith@gmail.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText("subject"),
    "New Ticket Subject"
  );

  await userEvent.selectOptions(screen.getByRole("combobox"), "twitter");
  // Submit the form using userEvent
  await userEvent.click(screen.getByRole("button", { name: /add ticket/i }));
  // Assert that the addticket function is called with the correct data
  // renderWithProviders(<Home />);

  // screen.debug();
  // Assert that the success toast is displayed

  expect(
    await screen.findByText(/ticket added successfully!!/i)
  ).toBeInTheDocument();
  // Assert that the history object has been pushed to '/'
  expect(window.location.pathname).toBe("/");
});

it("should display a warning toast if any field is missing", async () => {
  renderWithProviders(<AddPost />);

  // Fill in some form fields using userEvent, but leave one empty
  userEvent.type(screen.getByPlaceholderText("Full name"), "John Smith");
  userEvent.type(screen.getByPlaceholderText("subject"), "New Ticket Subject");
  userEvent.selectOptions(screen.getByRole("combobox"), "twitter");

  // Submit the form using userEvent
  userEvent.click(screen.getByRole("button", { name: /add ticket/i }));

  //expect to show the warning toast if any field is missing
  expect(
    await screen.findByText(/Please fill in all fields!!/i)
  ).toBeInTheDocument();

  //expect warning to be removed after sometime
  // expect(
  //   waitForElementToBeRemoved(screen.getByText(/Please fill in all fields/i))
  // ).toBeTruthy();
  await waitForElementToBeRemoved(() =>
    screen.getByText(/Please fill in all fields/i)
  ).then(() => console.log("element has been removed"));

  //expect Stay on the same page
  expect(
    screen.getByRole("heading", { name: /add ticket/i })
  ).toBeInTheDocument();
});
