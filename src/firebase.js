import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjHheogB0RiZHavgJhH3u-QVJMj4S2c38",
  authDomain: "virtualease0058.firebaseapp.com",
  projectId: "virtualease0058",
  storageBucket: "virtualease0058.appspot.com",
  messagingSenderId: "514401256753",
  appId: "1:514401256753:web:ba2438b3e2a7bf12e59c10",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
