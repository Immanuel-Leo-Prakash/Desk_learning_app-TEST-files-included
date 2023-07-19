import React from "react";
import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
// import configureStore from "redux-mock-store";
import { createStore } from "redux";

import { Provider } from "react-redux";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { contactReducer } from "../redux/reducers/contactReducer";

import { ticketReducer } from "../redux/reducers/ticketReducer";
import { ToastContainer } from "react-toastify";

export const renderWithProviders = (
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

const customRender = (
  ui,
  {
    preloadedState = {},
    store = createStore(contactReducer),
    ...renderOptions
  } = {}
) => {
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

export * from "@testing-library/react";
export { customRender as render };
