import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import propTypes from "prop-types";

const AddContact = ({ contact, deleteContact, addContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhone] = useState("");
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (!email || !name || !phno) {
      return toast.warning("Please fill in all fields!!");
    }
    const data = {
      id: contact.length > 0 ? contact[contact.length - 1].id + 1 : 0,
      email,
      name,
      phno,
    };
    addContact(data);
    toast.success("Contact added successfully!!");
    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <>
      <div className="container text-center ">
        <div>
          <h3>Contacts</h3>
          <form
            className="row justify-content-between"
            onSubmit={handleSubmit1}
          >
            <input
              type="text"
              placeholder="name"
              className="form-control col-md-2 col"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="email"
              className="form-control col-md-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="phone number"
              className="form-control col-md-2"
              value={phno}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <input type="submit" className="btn btn-success" value="ADD" />
          </form>
          <div className="container text-center"></div>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">Ph No</th>
                <th scope="col">email</th>
              </tr>
              {contact.map((contact, id) => (
                <tr key={id}>
                  <td>{contact.name}</td>
                  <td>{contact.phno}</td>
                  <td>{contact.email}</td>
                  <td>
                    <button
                      className="btn btn-danger "
                      onClick={() => deleteContact(contact.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};
AddContact.propTypes = {
  contact: propTypes.any,
  deleteContact: propTypes.any,
  addContact: propTypes.any,
};
const mapStateTocontact = (state) => ({
  contact: state,
});
const mapDispatchTocontact = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
  addContact: (data) => {
    dispatch({ type: "CREATE_NEW_CONTACT", payload: data });
  },
});
export default connect(mapStateTocontact, mapDispatchTocontact)(AddContact);
