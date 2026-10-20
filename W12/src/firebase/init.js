// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudok0IS4tbh8ghYfqa3hIwKos5WEn4aU",
  authDomain: "fit5032-d97a4.firebaseapp.com",
  projectId: "fit5032-d97a4",
  storageBucket: "fit5032-d97a4.firebasestorage.app",
  messagingSenderId: "72399076018",
  appId: "1:72399076018:web:322f9888c3f611d891a7ab"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const db = getFirestore();
export default db