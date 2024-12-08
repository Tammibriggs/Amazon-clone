import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKLO2-lvK3kvIkf5f7QuOM-G4k4DkA13A",
  authDomain: "amazemo-d4876.firebaseapp.com",
  projectId: "amazemo-d4876",
  storageBucket: "amazemo-d4876.firebasestorage.app",
  messagingSenderId: "388994197852",
  appId: "1:388994197852:web:953bc0bf2ee69cee2d7999"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db, auth}