
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBp1tSmxU_Ux2r-6sdThrgRFATuw3xtgQ8',
  authDomain: 'todo-app-b563e.firebaseapp.com',
  projectId: 'todo-app-b563e',
  storageBucket: 'todo-app-b563e.appspot.com',
  messagingSenderId: '19333321145',
  appId: '1:19333321145:web:e9737cda25f53ee349e668'
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}