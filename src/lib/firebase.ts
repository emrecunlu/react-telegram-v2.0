// Import the functions you need from the SDKs you need
import { setUser } from "@/store/features/auth";
import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB-tlihHpX5FeeWRtGo59t-64pHj6A2cs",
  authDomain: "next-app-3a66f.firebaseapp.com",
  projectId: "next-app-3a66f",
  storageBucket: "next-app-3a66f.appspot.com",
  messagingSenderId: "308370974846",
  appId: "1:308370974846:web:119f028dd1174e5514502f",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

onAuthStateChanged(auth, (user) => {
  setUser(user);
});

export { app, auth, db, storage, signInWithPopup };
