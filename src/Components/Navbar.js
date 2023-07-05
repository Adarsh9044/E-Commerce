import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { db, auth } from "../FirebaseConfig/firebaseconfig";
import { collection, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import cart from "../Components/Images/cart.png";
import profile from "../Components/Images/profile.png";
import Applogo from "./Images/Applogo.png";
const Navbar = () => {
  function GetCurrentuser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      //Get the currently signed-in user
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          // User is signed in
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          // User is signed out
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentuser();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };


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
  //to add theme changer
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <div className="navbar">
        <div className="Leftcontainer">
          <img src={Applogo} />
        </div>
        <div className="Rightcontainer">
          {!loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/signup">
                <button>Registration</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
             
                <div className="cart-btn">
                <Link to="/cart"><img src={cart} /></Link>
                <button className="cart-icon-css">0</button>
                </div>
              
              <Link to="/userprofile">
                <div>
                  <img className="profile-icon" src={profile} />
                </div>
              </Link>
            </nav>
          )}

          {loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/sell">
                <button>Sell</button>
              </Link>
            
                <div className="cart-btn">
                <Link to="/cart"><img src={cart} /></Link>
                  <button className="cart-icon-css">{cartdata.length}</button>
                </div>
              
              <Link to="/userprofile">
                <div>
                  <img className="profile-icon" src={profile} />
                </div>
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </nav>
          )}
        </div>
      </div>
      <div className="product-types">
        <a href="/product-type/mobiles"><button>Mobiles</button></a>
        <a href="/product-type/laptops"><button>Laptops</button></a>
        <a href="/product-type/cameras"><button>Cameras</button></a>
        <a href="/product-type/shoes"><button>Shoes</button></a>
      </div>
    </div>
  );
};

export default Navbar;
