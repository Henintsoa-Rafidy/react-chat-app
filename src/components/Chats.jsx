import React from 'react'
import Pokeball from '../img/pokeball.png'

const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={Pokeball} alt="" />
        <div className="userChatInfo">
          <span className="jane">Jane</span>
          <p>Hello world</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Pokeball} alt="" />
        <div className="userChatInfo">
          <span className="jane">Jane</span>
          <p>Hello world</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Pokeball} alt="" />
        <div className="userChatInfo">
          <span className="jane">Jane</span>
          <p>Hello world</p>
        </div>
      </div>
    </div>
  )
}

export default Chats;