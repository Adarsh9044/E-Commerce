import React, { useEffect, useState ,componentDidMount} from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { db, auth } from "../../FirebaseConfig/firebaseconfig";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import "./Specificproduct.css";
import Productslider from "./Productslider";
import Codimage from "../Images/bannerimages/Codimage.jpeg";
import Warrantyimage from "../Images/bannerimages/Warrantyimage.png";
import replacementimage from "../Images/bannerimages/replacementimage.png";
const Specficproduct = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const [errormsg, setErrormsg] = useState("");

  function GetCurrentuser() {
    const [user, setUser] = useState("");
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

  function GetCurrentProduct() {
    useEffect(() => {
      const getProdcut = async () => {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProdcut();
    }, []);
  }
  GetCurrentProduct();

  let totaltax = 10 / 100;
  let totalcommision = 10 / 100;
  let extratax = 10 / 100;
  let mrp = parseInt(product.price);
  mrp = mrp + totaltax * mrp + totalcommision * mrp + extratax * mrp;
  const saleprice = mrp - extratax * mrp;
    

const addtocart=()=>{
    if(loggeduser){
   addDoc(collection(db,`cart-${loggeduser[0].uid}`),{product,quantity:1})
   .then(()=>{
        setSuccessmsg("Product Added ");
   }).catch((error) => { setErrormsg(error.message) });
    }
    else{
      setErrormsg("You Need To Login First");  
      
    }
};




  return (
    <div>
    <Navbar />

    {product ?
        <div className='myprod-container'>
            <div className='prod-img-cont'>
                <img src={product.productimage} />
            </div>

            <div className='prod-data'>
                <p className='prod-head'>{product.producttitle}</p>
                <p className='prod-keyspecs'>{product.productspec}</p>
                <div className='specific-price-container'>
                    <p className='mrp'>MRP: <p className='rate'>₹{mrp}</p></p>
                    <p className='saleprice'>Discount Price: <p className='rate'>₹{saleprice}</p></p>
                    <p className='yousave'>You Save: ₹{mrp - saleprice}</p>
                </div>
                <p className='prod-details-head'>Details</p>
                <p className='prod-description'>{product.description}</p>
                <div className='row-cont'>
                    <div className='warranty-replacement'>
                        <div className='cod'>
                            <div className='img-circle'>
                                <img src={Codimage} />
                            </div>
                            <p>Cash on Delivery</p>
                        </div>
                        <div className='warranty'>
                            <div className='img-circle'>
                                <img src={Warrantyimage}/>
                            </div>
                            <p>{product.warranty} year warranty</p>
                        </div>

                        <div className='replacement'>
                            <div className='img-circle'>
                                <img src={replacementimage} />
                            </div>
                            <p>10 Days replacement</p>
                        </div>
                    </div>
                    <div className='buy-cart'>
                        <button className='btn'>Buy Now</button>
                        <button className='btn' onClick={addtocart}>Add to Cart</button>
                    </div>
                </div>
                {successmsg && <>
                    <div className='success-msg'>{successmsg}</div>
                </>}
                {errormsg && <>
                    <div className='error-msg'>{errormsg}</div>
                </>}
            </div>
        </div>
        : <p>Loading...</p>}
    <p className='prod-details-head2'>Similar Items</p>
    <Productslider type={type} />

</div>
  );
};

export default Specficproduct;
