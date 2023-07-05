import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyB1vbHpinyKsSOUcjCvkvbyz6gzyHhSfxs",
  authDomain: "e-commerce050723.firebaseapp.com",
  projectId: "e-commerce050723",
  storageBucket: "e-commerce050723.appspot.com",
  messagingSenderId: "552477600489",
  appId: "1:552477600489:web:b7afe4bdcd57569b9ade78"
};

 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);
 export const storage =getStorage(app);
 export const auth=getAuth(app);
