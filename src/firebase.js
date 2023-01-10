// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClrdufuA-99iwOxNWESWq_zbb2y4EhPqA",
  authDomain: "chat-42c51.firebaseapp.com",
  projectId: "chat-42c51",
  storageBucket: "chat-42c51.appspot.com",
  messagingSenderId: "709926818139",
  appId: "1:709926818139:web:affca5fe5ecb84e1ee0a7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Storage reference for the profile picture
export const storage = getStorage();

export const db = getFirestore();
