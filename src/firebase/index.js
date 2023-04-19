import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2yMsb0aN9VLldMnBG9wQexNK0XisbL84",
  authDomain: "polly-27e70.firebaseapp.com",
  projectId: "polly-27e70",
  storageBucket: "polly-27e70.appspot.com",
  messagingSenderId: "45120484644",
  appId: "1:45120484644:web:14ba4ed9161b206b08afb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Datenbank überall in der App nutzbar machen:
export {
    db, app
} 