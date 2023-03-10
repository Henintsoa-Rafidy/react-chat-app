import React, { useContext } from 'react'
import { useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        setUser(doc.data())
      });

      console.log("user querried : ", user);
    } catch (error) {
      setErr(true);
      console.log(error)      
    }
  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {

    console.log("handleSelect user", user);
    console.log("currentUser", currentUser);

    //Check wether the group (chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
    
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: []} );
      
        //Create user chats
        await  updateDoc(doc(db, "usersChat", currentUser.uid), {
          [combinedId+".userInfo"] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        await  updateDoc(doc(db, "usersChat", user.uid), {
          [combinedId+".userInfo"] : {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
      
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
      </div>
     
     {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span className="jane">{user.displayName}</span>
        </div>
      </div>}
    
      {err === true && <p>An error occurred</p>}
    </div>
  )
}

export  default Search