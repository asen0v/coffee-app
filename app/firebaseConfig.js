
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Copy your own config and paste it here
const firebaseConfig = {
    apiKey: "AIzaSyA-2iv8unNr5Q2__Tz9-fVwIabdRepyNHY",

    authDomain: "coffee-app-ves.firebaseapp.com",
  
    projectId: "coffee-app-ves",
  
    storageBucket: "coffee-app-ves.appspot.com",
  
    messagingSenderId: "806455122088",
  
    appId: "1:806455122088:web:1415c276391b2cc0510a9d"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};