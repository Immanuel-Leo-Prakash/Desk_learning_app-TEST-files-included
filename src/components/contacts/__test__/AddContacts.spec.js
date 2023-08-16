import { screen, within, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddContact from "../AddContacts";
import { contactReducer } from "../../../redux/reducers/contactReducer";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { renderWithContactReducer } from "../../../utils/test-utils";

beforeEach(() => {
  const history = createMemoryHistory();

  renderWithContactReducer(<AddContact />);
});

test("Adding New Contacts", async () => {
  await userEvent.type(
    screen.getByRole("textbox", { name: /name/i }),
    "Itachi Uchiha"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /email/i }),
    "mangekyou@gmail.com"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /phone number/i }),
    "9988776655"
  );

  await userEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(screen.getByRole("alert")).toBeInTheDocument();
  //expect the new contact to be added
  expect(screen.getByText("mangekyou@gmail.com")).toBeInTheDocument();
  //expect the contact to be removed from the screen when delete button is clicked
  const table = screen.getByRole("table");
  const rows = table.getElementsByTagName("tr");
  // Assert the number of rows in the table body (excluding the header row)
  expect(rows.length).toBe(6); //seems implementation details
});

test("Contact will be deleted when the delete button is clicked", async () => {
  const row = screen.getByRole("row", {
    name: /ramya 987654321 ramya@zohocorp\.com remove/i,
  });
  const remove_Button = within(row).getByRole("button", { name: /remove/i });
  await userEvent.click(remove_Button);
  const removed_Contact = screen.queryByRole("cell", {
    name: /ramya@zohocorp\.com/i,
  });
  //expect the removed contact is not in the screen
  expect(removed_Contact).toBeNull();
});
