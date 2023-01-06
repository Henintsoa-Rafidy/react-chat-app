import React from 'react'
import Trombone from '../img/icons/trombone_2.png' 
import Image from '../img/addAvatar.png' 

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder="Type something ..." id="" />
      <div className="send">
        <img src={Trombone} alt="" />
        <input type="file" style={{display: 'none'}} id="file"/>
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button type='button'>Send</button>
      </div>
    </div>
  )
}

export default Input;
