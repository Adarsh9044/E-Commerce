import React from 'react';
import './App.css';
import {db,storage,auth,app} from './FirebaseConfig/firebaseconfig'
import {Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Pgfof from './Components/Pgfof';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import Addproduct from './Components/Addproduct';
import Allproduct from './Components/Productcomponents/Allproduct';
import Specficproduct from './Components/Productcomponents/Specficproduct';
function App() {


  return (
    <div className="App">
    
<Routes>
  <Route  path='/'  element={<Home/>}  />
  <Route  path='/home'  element={<Home/>}  />
  <Route  path='/signup'  element={<Signup/>}  />
  <Route  path='/login'  element={<Login/>}  />
  <Route  path='/cart'  element={<Cart/>}  />
  <Route  path='/userprofile'  element={<Profile/>}  />
  <Route  path='/sell'  element={<Addproduct/>}  />
  <Route  path='*'  element={<Pgfof/>}  />

  <Route path='/product-type/mobiles' element={<Allproduct type={'Mobile'} />}></Route>
  <Route path='/product-type/laptops' element={<Allproduct type={'Laptop'} />}></Route>
  <Route path='/product-type/cameras' element={<Allproduct type={'Camera'} />}></Route>
  <Route path='/product-type/shoes' element={<Allproduct type={'Shoes'} />}></Route>
  <Route path='/product/:type/:id' element={<Specficproduct/>}/>


</Routes>
     
      </div>
  );
}

export default App;
