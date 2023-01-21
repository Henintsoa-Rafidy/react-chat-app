import React, { useContext } from 'react'
import Trombone from '../img/icons/trombone_2.png' 
import Image from '../img/addAvatar.png' 
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on( 'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('defautl case selectec')
          }
        }, 
        (error) => {
          //setErr(true)
        }, 
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          });

        }
      );
      
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }
  }

  return (
    <div className='input'>
      <input type="text" placeholder="Type something ..." id="" onChange={e => setText(e.target.value)}/>
      <div className="send">
        <img src={Trombone} alt="" />
        <input type="file" style={{display: 'none'}} id="file" onChange={e => setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Image} alt="" />
        </label>
        <button type='button' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input;
