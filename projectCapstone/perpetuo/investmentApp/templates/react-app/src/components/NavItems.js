import React from 'react'

function NavItem(props) {
  return (
    <a className='hover:text-secondary-color' href="#">
        <div className='py-2 hover:pt-0'>{props.title}</div>
    </a>
  )
}

export default NavItem