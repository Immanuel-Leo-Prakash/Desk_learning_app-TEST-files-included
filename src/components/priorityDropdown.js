import * as React from 'react'

const Dropdown = () => {
  return (
    <div>
        <select className='btn'>
          <option value="Open">Open</option>
          <option value="On Hold">On Hold</option>
          <option value="Closed">Closed</option>
        </select>
    </div>
  )
}

export default Dropdown
