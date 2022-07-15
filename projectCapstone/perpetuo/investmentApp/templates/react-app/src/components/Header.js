import React from 'react';

function Header() {
  return (
    <div className='bg-primary-color p-2 flex text-white justify-between items-center uppercase font-black'>
        <h1 className='text-[#00D05A] text-5xl font-logo tracking-widest'>PERPETUO</h1>
        <nav className='flex w-1/2 gap-3 align-middle px-1 justify-evenly'>
            <a className='hover:text-secondary-color' href="#">Home</a>
            <a className='hover:text-secondary-color' href="#">Portfolio</a>
            <a className='hover:text-secondary-color' href="#">Profile</a>
            <a className='hover:text-secondary-color' href="#">Sign Out</a>
        </nav>
    </div>
  )
}

export default Header