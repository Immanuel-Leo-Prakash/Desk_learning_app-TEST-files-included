import {
  screen,
  within,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import "@testing-library/jest-dom";

// import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  renderWithTicketReducer,
  renderWithRouter,
} from "../../../utils/test-utils";
import Home from "../index";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";

beforeEach(() => {
  renderWithTicketReducer(<Home />);
});
test("Click delete button will delete the ticket from list", async () => {
  //before delete the contact
  expect(screen.getByText(/kiren/i)).toBeInTheDocument();

  const row = screen.getByRole("row", {
    name: /1 kiren kiren error in ui open edit delete/i,
  });
  const delete_button = within(row).getByRole("button", { name: /delete/i });
  await userEvent.click(delete_button);

  // Delete the ticket
  expect(screen.queryByText(/kiren/i)).not.toBeInTheDocument();
});

test("No ticket found message appear when no tickets in the page", async () => {
  const buttons = screen.getAllByRole("button", { name: /delete/i });

  // Loop through the buttons and trigger a click event on each of them
  for (const button of buttons) {
    await userEvent.click(button);
  }
  expect(
    screen.getByRole("columnheader", { name: /no ticket found/i })
  ).toBeVisible();
});
