import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from '../priorityDropdown'
import twitter from '../../assets/icons8-twitter.svg'
import mail from '../../assets/icons8-mail.svg'
import propTypes from 'prop-types'

const Home = ({ ticket, deleteticket }) => (
  <>
    <div className='col-md-10 mx-auto my-4 container'>
      <Link to='/add' className='btn btn-dark my-5 ml-auto container '>
        Add Ticket
      </Link>
      <table className='table '>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Medium</th>
            <th scope='col'>Name</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {ticket.length > 0
            ? (ticket.map((ticket, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>
                <img
                  src={ticket.medium === 'mail' ? mail : twitter}
                  alt={ticket.name} />
              </td>
              <td>{ticket.name}</td>
              <td>{ticket.subject}</td>

              <td>
                <Dropdown />
              </td>
              <td>
                <Link
                  to={`/edit/${ticket.id}`}
                  className='btn btn-sm btn-primary mr-1'
                >
                  Edit
                </Link>
                <button
                  type='button'
                  onClick={() => deleteticket(ticket.id)}
                  className='btn btn-sm btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
              ))
              )
            : (
              <tr>
                <th>No ticket found</th>
              </tr>
              )}
        </tbody>
      </table>
    </div>
  </>
)

Home.propTypes = {
  ticket: propTypes.any,
  deleteticket: propTypes.any
}
const mapStateToProps = (state) => ({
  ticket: state
})
const mapDispatchToProps = (dispatch) => ({
  deleteticket: (id) => {
    dispatch({ type: 'DELETE_ticket', payload: id })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
