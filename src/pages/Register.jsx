import React from 'react'
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
//import { collection, addDoc } from "firebase/firestore"; 


const Register = () => {
  
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res.user);

      const storageRef = ref(storage, 'gs://chat-42c51.appspot.com/' + displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
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
          setErr(true)
          console.log(error)
        }, 
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })

            console.log('lalala')

            try {
              console.log('trying')

              const docRef = await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email,
                password,
                photoURL: downloadURL
              });

              console.log("tried");
              console.log("Document written with ID: ", docRef.id);
            
            } catch (e) {
              console.error("Error adding document: ", e);
            }

          });

        }
      );
    } catch (error) {
      setErr(true);
      console.log(error)
    }

  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Lama Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <input style={{display: "none"}} type="file" id="file"/>
                <label htmlFor="file">
                  <img src={Add} alt="" id="add_avatar"/>
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span> }
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default Register;
