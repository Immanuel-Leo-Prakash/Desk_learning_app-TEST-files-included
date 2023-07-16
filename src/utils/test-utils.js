import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
// import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { contactReducer } from "../redux/reducers/contactReducer";

// As a basic setup, import your same slice reducers
// import userReducer from "../features/users/userSlice";
import { ticketReducer } from "../redux/reducers/ticketReducer";
import { ToastContainer } from "react-toastify";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { tickets: ticketReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <ToastContainer />
          {children}
        </MemoryRouter>
      </Provider>
    );
  }
  // const actions = store.getActions();
  // console.log(actions);

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
