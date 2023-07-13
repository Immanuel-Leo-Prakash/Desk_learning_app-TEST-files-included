const data = [
  { id: 1, name: 'Kiren', email: 'kiren@zohocorp.com', phno: 987654321 },
  { id: 2, name: 'Sharmila', email: 'Sharmila@zohocorp.com', phno: 987654321 },
  { id: 3, name: 'Ram', email: 'ram@zohocorp.com', phno: 987654321 },
  { id: 4, name: 'Ramya', email: 'ramya@zohocorp.com', phno: 987654321 }
]
export const contactReducer = (state = data, action) => {
  switch (action.type) {
    case 'CREATE_NEW_CONTACT':
      return [...state, Object.assign({}, action.payload)]
    case 'DELETE_CONTACT': {
      const ticketfilter = state.filter((ticket) =>
        ticket.id === action.payload ? null : ticket
      )
      state = ticketfilter

      return state
    }
    default:
      return state
  }
}
