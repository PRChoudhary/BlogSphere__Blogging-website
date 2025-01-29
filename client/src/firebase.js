// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mingle.firebaseapp.com",
  projectId: "blog-mingle",
  storageBucket: "blog-mingle.firebasestorage.app",
  messagingSenderId: "433530898313",
  appId: "1:433530898313:web:14accabef02d2d4e940358",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
