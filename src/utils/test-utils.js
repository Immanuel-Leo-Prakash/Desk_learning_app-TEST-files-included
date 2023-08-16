import React from "react";
import {
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { render } from "@testing-library/react";
// import { configureStore } from "@reduxjs/toolkit";
// import configureStore from "redux-mock-store";
import { createStore } from "redux";

import { Provider } from "react-redux";
import { MemoryRouter, BrowserRouter, Route } from "react-router-dom";
import { contactReducer } from "../redux/reducers/contactReducer";

import { ticketReducer } from "../redux/reducers/ticketReducer";
import { ToastContainer } from "react-toastify";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

export const renderWithTicketReducer = (
  ui,
  {
    preloadedState = {},
    store = createStore(ticketReducer),
    route = "/",
    ...renderOptions
  } = {}
) => {
  window.history.pushState({}, "Test page", route);
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
export const renderWithContactReducer = (
  ui,
  {
    preloadedState = {},
    store = createStore(contactReducer),
    route = "/",
    ...renderOptions
  } = {}
) => {
  window.history.pushState({}, "Test page", route);
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
export const renderForInitialEntries = (
  ui,
  {
    preloadedState = {},
    store = createStore(ticketReducer),
    route = "/",
    dynamicTicketId = "1",
    ...renderOptions
  } = {}
) => {
  window.history.pushState({}, "Test page", route);
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/edit/${dynamicTicketId}`]}>
          <Route path="/edit/:id">
            <ToastContainer />
            {children}
          </Route>
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
