import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import { updateProfile } from 'firebase/auth';
import {db,auth} from '../FirebaseConfig/firebaseconfig';
import { collection,query,where,getDocs,updateDoc,doc } from 'firebase/firestore';
import './Profile.css';


const Profile = () => {
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

  return (
    <div>
    <Navbar/>
    <div className='userprofile-outercontainer'>
    {loggeduser?<div className='user-profile'>
    <p className='Heading'>Your Account Detail</p>
    <div className='data-row'>
        <span> Name:</span>       
        <span>{loggeduser[0].Username}</span>
    </div>
    <div className='data-row'>
        <span>Email:</span>       
        <span>{loggeduser[0].Email}</span>
    </div>
    <div className='data-row'>
        <span>Phone:</span>       
        <span>{loggeduser[0].PhoneNo}</span>
    </div>
    <div className='data-row'>
        <span>Address:</span>       
        <span>{loggeduser[0].address}</span>
    </div>

    </div>:<div>
      <p className='Heading'>Please Login First</p>
    </div> }
    

    </div>
   </div>
  )
}

export default Profile;