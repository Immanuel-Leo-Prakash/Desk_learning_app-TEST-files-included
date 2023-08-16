import React from "react";
import { createStore } from "redux";
import { ticketReducer } from "../../../../redux/reducers/ticketReducer";

import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
// import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AddPost from "../index";
import "@testing-library/jest-dom";
import Home from "../../../Home/index";
import { MemoryRouter } from "react-router-dom";
import { renderWithTicketReducer } from "../../../../utils/test-utils";
import { jest } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

beforeEach(() => {
  renderWithTicketReducer(
    <>
      <AddPost />
      <Home />
    </>
  );
});
test("should appear success messsage and add a ticket in the Home", async () => {
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

  // Submit the form using userEvent
  await userEvent.click(screen.getByRole("button", { name: /add ticket/i }));

  //Toast success message appears
  expect(
    await screen.findByText(/ticket added successfully!!/i)
  ).toBeInTheDocument();

  //ticket to be added successfully
  expect(screen.getByText(/john smith/i)).toBeInTheDocument();
  // screen.debug();
});

test("should display a warning toast if any field is missing", async () => {
  // Fill in some form fields using userEvent, but leave one empty
  await userEvent.type(screen.getByPlaceholderText("Full name"), "John Smith");
  await userEvent.type(
    screen.getByPlaceholderText("subject"),
    "New Ticket Subject"
  );
  // await userEvent.selectOptions(screen.getByRole("combobox"), "twitter");
  // Submit the form using userEvent
  // act(() => {
  await userEvent.click(screen.getByRole("button", { name: /add ticket/i }));
  // });

  //expect to show the warning toast if any field is missing
  expect(
    await screen.findByText(/Please fill in all fields!!/i)
  ).toBeInTheDocument();

  //expect warning toast to be removed
  //expect Stay on the same page
  expect(
    screen.getByRole("heading", { name: /add ticket/i })
  ).toBeInTheDocument();
});
