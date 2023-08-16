import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  renderForInitialEntries,
  renderWithTicketReducer,
} from "../../../../utils/test-utils";
import Home from "../../../Home";
import userEvent from "@testing-library/user-event";
import Editticket from "../index";
import { createStore } from "redux";
import "@testing-library/jest-dom";

import { ticketReducer } from "../../../../redux/reducers/ticketReducer";
import { Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const dynamicTicketId = "2";

const renderWithStoreAndRouter = (
  ui,
  {
    preloadedState = {},
    store = createStore(ticketReducer, preloadedState),
    route = "/",
  } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
  };
};
test("Should show warn message if any field is left empty", async () => {
  //choose the edit button dynamically

  renderForInitialEntries(<Editticket />, { dynamicTicketId });
  //check the subject's visibility
  expect(screen.getByRole("textbox", { name: /subject/i })).toHaveValue(
    "Refund needed"
  );

  userEvent.clear(screen.getByRole("textbox", { name: /subject/i }));
  //clear that subject input
  expect(screen.getByRole("textbox", { name: /subject/i })).toHaveValue("");
  userEvent.click(screen.getByRole("button", { name: /update ticket/i }));

  //click update button without fill all fields show warn message
  expect(
    await screen.findByText(/please fill in all fields/i)
  ).toBeInTheDocument();

  await userEvent.type(
    screen.getByRole("textbox", { name: /subject/i }),
    "Test subject"
  );
  await userEvent.click(screen.getByRole("button", { name: /update ticket/i }));
  // screen.debug();
});

test("Should update the Home page when any field is updated", async () => {
  renderForInitialEntries(
    <>
      <Editticket />
      <Home />
    </>,
    { dynamicTicketId }
  );
  await userEvent.clear(screen.getByRole("textbox", { name: /subject/i }));
  await userEvent.type(
    screen.getByRole("textbox", { name: /subject/i }),
    "Test Subject"
  );
  // screen.debug();

  //   screen.debug(screen.getByRole("button", { name: /update ticket/i }));
  await userEvent.click(screen.getByRole("button", { name: /update ticket/i }));
  await setTimeout(() => {
    console.log("Delayed for 1 second.");
    screen.debug();
  }, "2000");
});
