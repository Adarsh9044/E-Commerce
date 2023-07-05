import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAM92bnwY-XmU1EgdFgyVkdftTr8q2YZgc",
  authDomain: "ecommerce-280623.firebaseapp.com",
  projectId: "ecommerce-280623",
  storageBucket: "ecommerce-280623.appspot.com",
  messagingSenderId: "1016678663459",
  appId: "1:1016678663459:web:ec27b1d2ddac235d9f7896"
};

 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);
 export const storage =getStorage(app);
 export const auth=getAuth(app);