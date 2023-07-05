import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar';
import './Allproduct.css';
import Productcontainer from './Productcontainer';
import { collection,query,onSnapshot,getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/firebaseconfig';

const Allproduct = (props) => {
 const [products,setProducts]=useState([]);

 useEffect(()=>{
    const getproducts=()=>{
        const productArrays=[];
        const path=`products-${props.type.toUpperCase()}`;
      // console.log(path);

        getDocs(collection(db,path)).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                productArrays.push({...doc.data(),id:doc.id})
            //   console.log(doc.id,"=>",doc.data());
            })
            setProducts(productArrays);
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    getproducts();
 },[]);
// console.log(props.type);
// console.log(products);


  return (
    <div className='allproductpage'> 
    <Navbar/><div className='heading'>
<p>Top Products For {props.type} </p>
    
</div>
<div className='allproductcontainer'>

{products.map((produc)=>{
    return <Productcontainer
        key={produc.id}
        product={produc}
    /> ;
    
    
})}

</div>

    </div>
  )
}

export default Allproduct;