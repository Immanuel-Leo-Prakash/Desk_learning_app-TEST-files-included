import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import { createStore } from "redux";
import { ticketReducer } from "../redux/reducers/ticketReducer";
import { Provider } from "react-redux";
beforeAll(() => {
  const store = createStore(ticketReducer);
  const history = createMemoryHistory();
  //rendering app component to the screen
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
});
test("Integration test Adding new Ticket using ", async () => {
  //verify the initial render of the home page
  expect(screen.getByRole("link", { name: /add ticket/i })).toBeInTheDocument();

  //Click the add ticket button will redirect page to the add ticket page
  await userEvent.click(screen.getByRole("link", { name: /add ticket/i }));

  //Fill the name, email, and subject and click the add Ticket button
  await userEvent.type(screen.getByPlaceholderText(/full name/i), "Leo");
  await userEvent.type(screen.getByPlaceholderText(/Email/i), "leo@gmail.com");
  await userEvent.type(screen.getByPlaceholderText(/subject/i), "Bloody Sweet");
  await userEvent.click(screen.getByRole("button", { name: /add ticket/i }));
  //toastify successful message appear
  expect(screen.getByText(/ticket added successfully!!/i)).toBeInTheDocument();

  //New Ticket will be added
  const newEntry = screen.getByRole("row", { name: /leo bloody sweet/i });
  expect(newEntry).toBeInTheDocument();
  screen.debug(newEntry);
});
