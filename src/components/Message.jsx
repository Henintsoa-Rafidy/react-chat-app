import React from 'react'
import Pokeball from '../img/pokeball.png'

const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src={Pokeball} alt=""/> 
        <span>Just now</span>
      </div>

      <div className="messageContent">
        <p>Hello !!!</p>
        <img src={Pokeball} alt=""/> 
      </div>
    </div>
  )
}

export default Message;
