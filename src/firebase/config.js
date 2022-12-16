import { initializeApp } from "firebase/app";
import {
  getFirestore,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC9o5UPGN3fBf7ifDGW2uG0wo6FhBvHC7c",
  authDomain: "svg-hosting-4b46e.firebaseapp.com",
  projectId: "svg-hosting-4b46e",
  storageBucket: "svg-hosting-4b46e.appspot.com",
  messagingSenderId: "169346203891",
  appId: "1:169346203891:web:e741a114344f872e3bf786",
};
initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
export { storage, db, auth, ref, uploadBytesResumable, getDownloadURL };
