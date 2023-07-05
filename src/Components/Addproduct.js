import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db, auth, storage } from "../FirebaseConfig/firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import './Addproduct.css';
import { type } from "@testing-library/user-event/dist/type";

const Addproduct = () => {
  const [producttitle, setProducttitle] = useState("");
  const [producttype, setProducttype] = useState("");
  const [description, setDescrription] = useState("");
  const [brand, setBrand] = useState("");
  const [customersupport, setCustomersupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productimage, setProductimage] = useState("");
  const [productspec,setProductspec]=useState("");
  const [imageerror, setImageerror] = useState("");
  const [sucessmsg, setSucessmsg] = useState("");
  const [errormsg, setErrorsgmsg] = useState("");
  const [uploaderror, setUploaderror] = useState("");
 
  function GetCurrentuser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      //Get the currently signed-in user data
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

  const types=['image/jpg','image/jpeg','image/png','image/PNG'];
  const Handleproductimg = (e) => {
  e.preventDefault();
  let selectedfile=e.target.files[0];
  if(selectedfile){
    if(selectedfile && types.includes(selectedfile.type)){
        setProductimage(selectedfile);
        setImageerror("");
}
else{
    setProductimage(null);
    setImageerror("please select the valid images file types (png or jpg)")
  }
  }
  else{
    setImageerror("please select image");
  }

  };

const handleaddproduct=(e)=>{
  e.preventDefault();
  const storageRef=ref(storage,`products-images${producttype.toUpperCase()}/${Date.now()}`);
//console.log(storageRef._location.path);

uploadBytes(storageRef,productimage).then(()=>{
getDownloadURL(storageRef).then(url=>{
   addDoc(collection(db,`products-${producttype.toUpperCase()}`),{
    producttitle,
    producttype,
    productspec,
    description,
    brand,
    customersupport,
    price,
    warranty,
    productimage :url
   })
   setProducttitle("");

})
})


}
  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0].Email == "ada9021ada@gmail.com" ? (
        <div className="addproduct-container">
          <form className="addprod-form" onSubmit={handleaddproduct}>
            <p>Add Data</p>
            {sucessmsg && <div className="sucess-msg">{sucessmsg}</div>}
            {errormsg && <div className="error-msg">{errormsg}</div>}
            <label>Product Title</label>
            <input
              type="text"
              placeholder="enter product title"
              onChange={(e) => setProducttitle(e.target.value)}
            />

            <label>Product Type</label>
            <input
              type="text"
              placeholder="enter product type"
              onChange={(e) => setProducttype(e.target.value)}
            />

            <label>Product Brand</label>
            <input
              type="text"
              placeholder="enter product Brand"
              onChange={(e) => setBrand(e.target.value)}
            />

            <label>Warranty</label>
            <input
              type="text"
              placeholder="enter product Warranty"
              onChange={(e) => setWarranty(e.target.value)}
            />

            <label>Image</label>
            <input type="file" onChange={Handleproductimg} />
            {imageerror && (
              <>
                <div className="error-msg">{imageerror}</div>
              </>
            )}
            <label>Specification</label>
            <textarea
              placeholder="enter product sepection"
              onChange={(e) => setProductspec(e.target.value)}
            />

            <label>Description</label>
            <textarea
              placeholder="enter product description"
              onChange={(e) => setDescrription(e.target.value)}
            />

            <label>Price Without Tax</label>
            <input
              type="text"
              placeholder="enter price without tax"
              onChange={(e) => setPrice(e.target.value)}
            />

             <label>Customer Support</label>
            <input
              type="text"
              placeholder="customer support Email,Phone or address"
              onChange={(e) => setCustomersupport(e.target.value)}
            />

            <button  type="subit">Add</button>
          </form>
        </div>
      ) : (
        <div>"You don not have access to this product"</div>
      )}
    </div>
  );
};

export default Addproduct;
