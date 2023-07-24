import { firebase, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP6BNMvg4iO929zSFp_piV8XSHAsgduwQ",
  authDomain: "krisdiam-9e655.firebaseapp.com",
  databaseURL:
    "https://krisdiam-9e655-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "krisdiam-9e655",
  storageBucket: "krisdiam-9e655.appspot.com",
  messagingSenderId: "522933323947",
  appId: "1:522933323947:web:84b6453e804c6381618fee",
  measurementId: "G-353KSGCSWB",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
