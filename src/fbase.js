import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLT5Xjnx-pOWaJqn0gioWMeDinX8IEGY4",
  authDomain: "webtoonreviewsite.firebaseapp.com",
  projectId: "webtoonreviewsite",
  storageBucket: "webtoonreviewsite.appspot.com",
  messagingSenderId: "998598646567",
  appId: "1:998598646567:web:160a5630939a9a4c8aa702",
};

const firebase = initializeApp(firebaseConfig);
export const authService = getAuth(firebase);
export const dbService = getFirestore();
export const storageService = getStorage();
