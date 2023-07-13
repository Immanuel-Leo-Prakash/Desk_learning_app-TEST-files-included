import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'

const AddPost = ({ tickets, addticket }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [medium, setValue] = useState('mail')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !name || !subject) {
      return toast.warning('Please fill in all fields!!')
    }
    const data = {
      id: tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 0,
      email,
      name,
      subject,
      medium
    }

    addticket(data)
    toast.success('ticket added successfully!!')
    history.push('/')
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center text-dark py-3 display-2'>Add Ticket</h1>
      <div className='row'>
        <div className='col-md-6 p-5 mx-auto shadow'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <select
                className='btn p-2 mb-2'
                value={medium}
                onChange={(e) => setValue(e.target.value)}
              >
                <option value='email'>email</option>
                <option value='twitter'>twitter</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                className='btn btn-block btn-dark'
                type='submit'
                value='Add Ticket'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
AddPost.propTypes = { tickets: propTypes.any, addticket: propTypes.any }
const mapStateToProps = (state) => ({
  tickets: state
})
const mapDispatchToProps = (dispatch) => ({
  addticket: (data) => {
    dispatch({ type: 'ADD_ticket', payload: data })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
