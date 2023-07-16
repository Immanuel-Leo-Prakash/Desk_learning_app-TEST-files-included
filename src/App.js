import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddPost from "./components/Tickets/AddTicket";
import EditContact from "./components/Tickets/EditTicket";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Knowledge from "./components/KnowledgeBase/KB";
import AddContact from "./components/contacts/AddContacts";
import { Provider } from "react-redux";
import { contactReducer } from "./redux/reducers/contactReducer";
import { createStore } from "redux";
import PropTypes from "prop-types";
import { AddContactForm, ListView } from "./components/contacts/AddContacts";
const App = () => {
  const store = createStore(contactReducer);
  store.proptypes = {
    id: PropTypes.string.isRequired,
    subject: PropTypes.string,
    name: PropTypes.string,
    priority: PropTypes.string,
    medium: PropTypes.img,
    email: PropTypes.string,
    phno: PropTypes.number,
  };
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <AddPost />} />
      <Route exact path="/edit/:id" component={() => <EditContact />} />
      <Route
        path="/customers"
        component={() => (
          <Provider store={store}>
            <AddContact />
          </Provider>
        )}
      />
      <Route path="/KnowledgeBase" component={() => <Knowledge />} />
    </div>
  );
};
export default App;
