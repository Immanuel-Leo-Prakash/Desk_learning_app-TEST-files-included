import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
const Editticket = ({ tickets, updateticket }) => {
  const { id } = useParams()
  const history = useHistory()
  const currentticket = tickets.find(
    (ticket) => ticket.id === parseInt(id)
  )

  useEffect(() => {
    setName(currentticket.name)
    setEmail(currentticket.email)
    setsubject(currentticket.subject)
  }, [currentticket])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setsubject] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !name || !subject) {
      toast.warning('Please fill in all fields!')
      return
    }
    const data = {
      id: currentticket.id,
      email,
      name,
      subject
    }

    updateticket(data)
    toast.success('ticket updated successfully!!')
    history.push('/')
  }

  return (
    <div className='container'>
      <div className='row d-flex flex-column'>
        <button
          className='btn btn-dark ml-auto my-5'
          onClick={() => history.push('/')}
        >
          Go back
        </button>
        <div className='col-md-6 mx-auto shadow p-5'>
          {currentticket
            ? (
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  className='form-control'
                  value={name}
                  placeholder={'Name'}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  value={email}
                  placeholder={'Email'}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  value={subject}
                  placeholder={'subject'}
                  onChange={(e) => setsubject(e.target.value)}
                />
              </div>
              <div className='form-group d-flex align-items-center justify-content-between my-2'>
                <button type='submit' className='btn btn-primary'>
                  Update ticket
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => history.push('/')}
                >
                  cancel
                </button>
              </div>
            </form>
              )
            : (
            <h1 className='text-center'>No ticket Found</h1>
              )}
        </div>
      </div>
    </div>
  )
}
Editticket.propTypes = {
  tickets: propTypes.any, updateticket: propTypes.any
}

const mapStateToProps = (state) => ({
  tickets: state
})
const mapDispatchToProps = (dispatch) => ({
  updateticket: (data) => {
    dispatch({ type: 'UPDATE_ticket', payload: data })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Editticket)
