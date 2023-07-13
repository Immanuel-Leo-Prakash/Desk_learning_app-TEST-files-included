import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='text-white bg-dark'>
    <nav className='navbar navbar-expand-lg '>
      <ul className='nav nav-pills nav-fill text-white '>
        <li className='nav- text-white '>
          <Link className='h5 nav-link font-weight-bold' to='/'>
            Tickets
          </Link>
        </li>
        <li className='h5 nav-itemn font-weight-bold '>
          <Link className='nav-link' to='/customers'>
            Customers
          </Link>
        </li>
        <li className='h5 nav-item font-weight-bold text-white'>
          <Link className='nav-link' to='/KnowledgeBase'>
            Knowledge Base
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  )
}
export default Navbar
