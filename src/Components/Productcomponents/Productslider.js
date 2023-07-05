import React,{useEffect,useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { collection,query,onSnapshot,getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/firebaseconfig';
import Sliderproductcard from './Sliderproductcard';


const Productslider = (props) => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
    const getproducts=()=>{
        const productArrays=[];
        const path=`products-${props.type.toUpperCase()}`;
       console.log(path);

        getDocs(collection(db,path)).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                productArrays.push({...doc.data(),id:doc.id})
               console.log(doc.id,"=>",doc.data());
            })
            setProducts(productArrays);
        }).catch((error)=>{
            console.log(error.message)
        })
    }
    getproducts();
 },[]);

 const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Carousel responsive={responsive}>
  {
    products.map((produc)=>(<Sliderproductcard key={produc.id }  product={produc} />))
  }
</Carousel>
  )
}

export default Productslider;