import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Substitua com a configuração do seu projeto Firebase!
const firebaseConfig = {
    apiKey: "AIzaSyDZhhiOqOIMFMNcie1wgWIxRUh8UhILsjo",
    authDomain: "clarimdiario-ee7cc.firebaseapp.com",
    projectId: "clarimdiario-ee7cc",
    storageBucket: "clarimdiario-ee7cc.firebasestorage.app",
    messagingSenderId: "813538926626",
    appId: "1:813538926626:web:cfbdb9ec8341d3036f2a7b",
    measurementId: "G-49ZQ3EZR22"
  };
  

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que você usará
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);