import React from 'react'
import './Sliderproductcard.css';
import { Link } from 'react-router-dom';

const Sliderproductcard = (props) => {
  let a=props.product;
    let totaltax=10/100;
    let totalcommision=10/100;
    let extratax=10/100;
    let mrp=parseInt(props.product.price);
    mrp=mrp+totaltax*mrp+totalcommision*mrp+extratax*mrp;
    const saleprice=mrp-extratax*mrp;
  return (

   <div className='mini-pdt-cnt'>
    <div className='mini-img-cnt'>
        <img src={props.product.productimage}/>
    </div>
    <div className='mini-prod-detail'>
    <p className='mini-prodtitle'>{props.product.producttitle}</p>
    <p className='Product-spec'>{props.product.productspec}</p>
    <div className=' mini-price-container'>
            <p className='mrps'>MRP:<p className='rates'>₹{mrp}</p> </p>
            <p className='saleprices'>Discount MRP:<p className='rate'>₹{saleprice}</p> </p>
            <p className='yousaves'>You Save:₹{mrp-saleprice}</p>
        </div>
      <a href={`/product/${a.producttype}/${a.id}`} ><button className='showmore-btn'  >Show More{`->`}</button></a>
        
      </div>  
    
   </div>
  );


}

export default Sliderproductcard;