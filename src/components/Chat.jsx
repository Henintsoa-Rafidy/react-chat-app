import React from 'react'
import More from '../img/icons/three_points.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);

  console.log(data)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={More} alt="" />
        </div>
      </div>
      
      <Messages/>

      <Input/>
    </div>
  )
}

export default Chat;
