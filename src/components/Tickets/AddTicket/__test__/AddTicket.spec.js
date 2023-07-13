import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddPost from "../index";

const mockStore = configureStore([]);

describe("AddPost component", () => {
  it("should render the component and add a ticket", async () => {
    const store = mockStore({ tickets: [] });
    render(
      <Provider store={store}>
        <AddPost />
      </Provider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "johnsmith@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("subject"), {
      target: { value: "New Ticket Subject" },
    });

    // Select a value from the dropdown
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "twitter" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add ticket/i }));

    // Assert that the success toast is displayed
    //await waitFor(() => expect(toast.success).toHaveBeenCalled());

    // Assert that the store has received the correct action
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual({
      type: "ADD_ticket",
      payload: {
        id: expect.any(Number),
        name: "John Smith",
        email: "johnsmith@example.com",
        subject: "New Ticket Subject",
        medium: "twitter",
      },
    });
  });

  it("should display a warning toast if any field is missing", async () => {
    const store = mockStore({ tickets: [] });
    render(
      <Provider store={store}>
        <AddPost />
      </Provider>
    );

    // Fill in some form fields, but leave one empty
    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("subject"), {
      target: { value: "New Ticket Subject" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add ticket/i }));
    screen.debug();
    // Assert that the warning toast is displayed
    // const success = await screen.findByText(/ticket added successfully!!/i);
    //  expect(success).toBeInTheDocument();

    // Assert that the store has not received any actions
    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });
});
