import React,{useState,useEffect}from 'react';
import Navbar from './Navbar';
import Product from './Product';
import Banner from './Banner';
import './Home.css';
import {db,auth} from '../FirebaseConfig/firebaseconfig';
import { collection,query,where,getDocs } from 'firebase/firestore';
import Productslider from './Productcomponents/Productslider';
const Home = () => {

  function GetCurrentuser(){
    const [user,setUser]=useState("");
    const userCollectionRef=collection(db,"users")

    useEffect(()=>{//Get the currently signed-in user data
     auth.onAuthStateChanged(userlogged=>{
      if(userlogged){
        // User is signed in
        const getUsers=async()=>{
          const q=query(collection(db,"users"),where("uid","==",userlogged.uid));
          //console.log(q);
          const data=await getDocs(q);
          setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})
          ))
        }
        getUsers();
      }
      else{
         // User is signed out
        setUser(null);
      }
     


     })
    },[])
    return user;
  }
  const loggeduser=GetCurrentuser();
  if(loggeduser){console.log(loggeduser[0].Email);}
  
  return (
    <div>
      <Navbar/>
      <Banner/>
      <div className='slider-heading'><p> Limited time deal</p> </div>
     <Productslider type={'Mobile'}/>
     <Productslider type={'Laptop'}/>
     <Productslider type={'Camera'}/>
     <Productslider type={'Shoes'}/>
    </div>
    //or we can write {loggeduser?loggeduser.map((user)=>( <p>{user.Username}</p> )):"no dataf"}
      
  )
    
  
}

export default Home;