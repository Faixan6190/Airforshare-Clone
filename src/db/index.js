import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: "to-do-app-19ac6.firebaseapp.com",
  projectId: "to-do-app-19ac6",
  storageBucket: "to-do-app-19ac6.appspot.com",
  messagingSenderId: "395850870204",
  appId: "1:395850870204:web:5b8f2c9757cdbd68a60fb9",
  databaseURL: "https://to-do-app-19ac6-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

export { app, db, ref, set, onValue, remove, storage, storageRef, uploadBytesResumable, getDownloadURL };
