import React from 'react'
import Pokeball from '../img/pokeball.png'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='find a user' name="" id="" />
      </div>
      <div className="userChat">
        <img src={Pokeball} alt="" />
        <div className="userChatInfo">
          <span className="jane">Jane</span>
        </div>
      </div>
    </div>
  )
}

export  default Search