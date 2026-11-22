import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCr9Z9ZXkZxG1s1BZPv8Ak-LOirAWeKMzI",
  authDomain: "la-luna-de-papel.firebaseapp.com",
  projectId: "la-luna-de-papel",
  storageBucket: "la-luna-de-papel.firebasestorage.app",
  messagingSenderId: "1078605816113",
  appId: "1:1078605816113:web:d8352b53e6498e78a55010"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)