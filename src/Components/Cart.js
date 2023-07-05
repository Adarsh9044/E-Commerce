import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import { db,auth } from '../FirebaseConfig/firebaseconfig';
import { collection,getDocs,query,where } from 'firebase/firestore';
import Cartcard from '../Components/Cartcard';
import './Cart.css';
const Cart = () => {

  function GetCurrentuser(){
    const [user,setUser]=useState("");

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


  const [cartdata,setCartdata]=useState([]);
  if(loggeduser){
    const getcartdata=async ()=>{
      const cartarray=[];
      const path=`cart-${loggeduser[0].uid}`
      getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartarray.push({...doc.data(),id:doc.id})
        });
        setCartdata(cartarray)
      }).catch("Error Error")
    }
    getcartdata();
  }


  return (
    <div>
    <Navbar/>
           {cartdata?<div>
            <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
              
                        {cartdata.map((item) => (
                            <Cartcard
                                key={item.id}
                                itemdata={item}
                                userid={loggeduser[0].uid}
                            />
                            
                        ))}
                        <div className='proceed'>
                            <button>Proceed</button>
                        </div>
                    </div>
           </div>:<p>Cart is empty</p>}
    </div>
  )
}

export default Cart;