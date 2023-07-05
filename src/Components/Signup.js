import React from 'react';
import './Signup.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../FirebaseConfig/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection,addDoc } from 'firebase/firestore';
const Signup = () => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [phonenumber,setPhonenumber]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate("");
    const [errormsg,setErrormsg]=useState("");
    const [sucessmsg,setSucessmsg]=useState("");
    const [address,setAddress]=useState("");
   const handlesubmit=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((usercredential)=>{
    const user=usercredential.user;
    const intialcartvalue=0;
   // console.log(user);

    addDoc(collection(db,"users"), {
    Username: username,
    Email:email,
    PhoneNo:phonenumber,
    Password:password,
    cart:intialcartvalue,
    address:address, 
    uid:user.uid
    }).then(()=>{
        setSucessmsg('newuser added sucessful,now you wil redirect to login  page')
        setUsername("");
        setEmail("");
        setPassword("");
        setPhonenumber("");
        setErrormsg("");
        setTimeout(()=>{
            setSucessmsg("");
            navigate('/login');
        },4000);
     })
   }).catch((error)=>{
    setErrormsg(error.message);
   })
   };

  return (
    <div><Navbar/>
    <div className='signup-container'>
<form className='signup-form' onSubmit={handlesubmit}>

<p>Create Account</p>
{sucessmsg&&<>
<div className='success-msg'>
    {sucessmsg}
</div>
</>}
{ errormsg  &&<>
        <div className='error-msg'>{errormsg}</div>
    </>
}
<label>Name:</label>
<input  type="text" placeholder='first and last name' onChange={(e)=>setUsername(e.target.value)}/>

<label>Phone:</label>
<input  type="tel" placeholder='enter number..' onChange={(e)=>setPhonenumber(e.target.value)}/>

<label>Email:</label>
<input  type="email" placeholder='enter email..' onChange={(e)=>setEmail(e.target.value)}/>

<label>Address</label>
<textarea  type="description" placeholder='enter address..' onChange={(e)=>setAddress(e.target.value)}/>

<label>Password</label>
<input  type="password" placeholder='enter password..' onChange={(e)=>setPassword(e.target.value)}/>

<button type='submit'> submit</button>
<div><span>Already have an account</span>
<Link  to='/login'>Sign In</Link></div>
</form>
    </div>
    </div>
  )
}

export default Signup;