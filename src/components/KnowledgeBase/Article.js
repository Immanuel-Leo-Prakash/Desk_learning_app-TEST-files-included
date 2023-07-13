import React from 'react'
import moment from 'moment'
import propTypes from 'prop-types'
const Article = ({ id, title, snippet, date, length }) => {
  return (
    <div className='container'>
      <div className='col'>
        <h3>{id} {title}</h3>
          <div className='float-right'>
           <button type='btn' className='btn btn-primary mr-2 float-right'>
          Edit
        </button>
        <button type='btn' className='btn btn-primary mr-2 float-right'>
          Remove
        </button>
        </div>
      </div>
      <div className='card-body'>
        <h6 className='card-title'>{snippet}</h6>
        <span>{moment(date).format('dddd Do, YYYY')}</span>
        <span> {length} min read</span>
      </div>
      <br></br>
    </div>
  )
}
Article.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  snippet: propTypes.string,
  date: propTypes.any,
  length: propTypes.number
}
export default Article
