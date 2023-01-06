import React from 'react'
import Akatsuki from '../img/akatsuki.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">Dark Chat</span>
      <div className="user">
        <img src={Akatsuki} alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;