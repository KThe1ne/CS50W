import React from 'react';
import NavItem from './NavItems';

function Header() {
  return (
    <div className='bg-primary-color p-2 flex text-white justify-between items-center uppercase font-black'>
        <h1 className='text-secondary-color text-5xl font-logo tracking-widest'>PERPETUO</h1>
        <nav className='flex w-1/2 gap-3 align-middle px-1 justify-evenly'>
            <NavItem title="Home"/>
            <NavItem title="Portfolio"/>
            <NavItem title="Profile"/>
            <NavItem title="Sign Out"/> 
        </nav>
    </div>
  )
}

export default Header