// ATENÇÃO: As credenciais do Firebase estão diretamente neste arquivo.
// Esta é uma MÁ PRÁTICA de segurança em produção!
// Para proteger suas chaves e informações sensíveis:
// 1. Remova as credenciais hardcoded deste arquivo.
// 2. Utilize variáveis de ambiente para carregar estas configurações.
//    Por exemplo, crie um arquivo `.env` na raiz do projeto e adicione suas chaves lá:
//    REACT_APP_FIREBASE_API_KEY=sua_api_key
//    REACT_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
//    REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
//    REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
//    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
//    REACT_APP_FIREBASE_APP_ID=seu_app_id
//    REACT_APP_FIREBASE_MEASUREMENT_ID=seu_measurement_id
// 3. Acesse essas variáveis no seu código usando `process.env.REACT_APP_NOME_DA_VARIAVEL`.
// 4. Certifique-se de que o arquivo `.env` esteja no seu `.gitignore` para não ser enviado ao repositório.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Substitua com a configuração do seu projeto Firebase!
// Idealmente, estas configurações devem vir de variáveis de ambiente.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDZhhiOqOIMFMNcie1wgWIxRUh8UhILsjo",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "clarimdiario-ee7cc.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "clarimdiario-ee7cc",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "clarimdiario-ee7cc.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "813538926626",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:813538926626:web:cfbdb9ec8341d3036f2a7b",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-49ZQ3EZR22"
  };
  

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que você usará
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);