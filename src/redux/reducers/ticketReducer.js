const initialState = [
  {
    id: 1,
    subject: "Error in UI",
    name: "Kiren",
    priority: "Low",
    medium: "mail",
    email: "kiren@zohocorp.com",
    phno: 987654321,
  },
  {
    id: 2,
    subject: "Refund needed",
    name: "Sharmila",
    priority: "High",
    medium: "twitter",
    email: "Sharmila@zohocorp.com",
    phno: 987654321,
  },
  {
    id: 3,
    subject: "Replacement ",
    name: "Ramya ",
    priority: "Low",
    medium: "mail",
    email: "ramya@zohocorp.com",
    phno: 987654321,
  },
  // {
  //   id: 4,
  //   subject: 'Speaker problem',
  //   name: 'Sharmila',
  //   priority: 'High',
  //   medium: 'twitter',
  //   email: 'Sharmila@zohocorp.com',
  //   phno: 987654321
  // },
  // {
  //   id: 5,
  //   subject: 'Mic problem  ',
  //   name: 'Logesh',
  //   priority: 'Low',
  //   medium: 'mail',
  //   email: 'logesh@zohocorp.com',
  //   phno: 987654321
  // }
];
export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ticket":
      state = [...state, action.payload];
      return state;
    case "DELETE_ticket": {
      const ticketFilter = state.filter((ticket) =>
        ticket.id === action.payload ? null : ticket
      );
      state = ticketFilter;
      return state;
    }
    case "UPDATE_ticket": {
      const ticketUpdate = state.filter((ticket) =>
        ticket.id === action.payload.id
          ? Object.assign(ticket, action.payload)
          : ticket
      );
      state = ticketUpdate;
      return state;
    }
    case "RESET_ticket":
      state = [{ name: null, email: null, phone: null }];
      return state;
    default:
      return state;
  }
};
