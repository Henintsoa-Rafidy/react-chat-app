import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import Pokeball from '../img/pokeball.png'

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    {/* <div className='message owner'>
      <div className="messageInfo">
        <img src={Pokeball} alt=""/> 
        <span>Just now</span>
      </div>

      <div className="messageContent">
        <p>Hello !!!</p>
        <img src={Pokeball} alt=""/> 
      </div>
  </div>*/}
  )
}

export default Message;
