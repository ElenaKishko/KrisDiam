import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyDP6BNMvg4iO929zSFp_piV8XSHAsgduwQ",
  authDomain: "krisdiam-9e655.firebaseapp.com",
  databaseURL: "https://krisdiam-9e655-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "krisdiam-9e655",
  storageBucket: "krisdiam-9e655.appspot.com",
  messagingSenderId: "522933323947",
  appId: "1:522933323947:web:84b6453e804c6381618fee",
  measurementId: "G-353KSGCSWB"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
