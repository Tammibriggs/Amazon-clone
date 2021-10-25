import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqvB3a-9rpvrbA1rUWERAC0y2NhD-53vA",
    authDomain: "challange-5f99e.firebaseapp.com",
    projectId: "challange-5f99e",
    storageBucket: "challange-5f99e.appspot.com",
    messagingSenderId: "124606272614",
    appId: "1:124606272614:web:2dcb2718dda2ada4e449a7",
    measurementId: "G-WNKYJ2159E"
  };

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db, auth}