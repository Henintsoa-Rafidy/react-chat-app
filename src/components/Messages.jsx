import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    
    console.log('data to retrieve chats : ', data.chatId);

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {

      console.log('Messages data : ', doc.data());

      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub();
    }

  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages.map(m => (
        <Message message={m} key={m.id}/>
      ))}
    </div>
  )
}

export default Messages;
