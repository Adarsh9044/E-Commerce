import React,{useState} from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [errormsg,setErrormsg]=useState("");
 const [sucessmsg,setSucessmsg]=useState("");
 const auth=getAuth();
 const navigate =useNavigate();

 const handlelogin=(e)=>{
  e.preventDefault(); 
  signInWithEmailAndPassword(auth,email,password)
  .then(()=>{
    setSucessmsg('Logged in sucessful ,you will redirect to Home page')
        setEmail("");
        setPassword("");
        setErrormsg("");
        setTimeout(()=>{
            setSucessmsg("");
            navigate('/home');
        },3000);
  }).catch((error)=>{
    setErrormsg(error.message);
   })
 }
  return (
    <div>
   <Navbar/>
   <div className='Login-container'>
       <form className='Login-form'>

      <p>Login Form</p>
      {sucessmsg&&<>
      <div className='success-msg'>
    {sucessmsg}
       </div>
        </>}
{
    errormsg&&<>
        <div className='error-msg'>{errormsg}</div>
    </>
}

<label>Email:</label>
<input  type="email" placeholder='enter email..' onChange={(e)=>setEmail(e.target.value)}/>

<label>Password:</label>
<input  type="password" placeholder='enter password..' onChange={(e)=>setPassword(e.target.value)}/>

<button onClick={handlelogin}>Login</button>
<div><span>Do  not have an account</span>
<Link  to='/signup'>Sign In</Link></div>
</form>
    </div>
    </div>
  )
}

export default Login;