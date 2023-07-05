import React from 'react';
import './Productcontainer.css';
import { Link } from 'react-router-dom';
const Productcontainer = (props) => {
    let a=props.product;
  let totaltax=10/100;
    let totalcommision=10/100;
    let extratax=10/100;
    let mrp=parseInt(props.product.price);
    mrp=mrp+totaltax*mrp+totalcommision*mrp+extratax*mrp;
    const saleprice=mrp-extratax*mrp;

  return (
    <div className='product-container'>
    <img  src={props.product.productimage}  />
    <div className='product-details'>
      <a href={`/product/${a.producttype}/${a.id}`}>
      <button className='producttitle'>{a.producttitle}</button>
      </a>  
        <p className='Product-spec'>{props.product.productspec}</p>
        <div className='price-container'>
            <p className='mrp'>MRP:<p className='rate'>₹{mrp}</p> </p>
            <p className='saleprice'>Discount MRP:<p className='rate'>₹{saleprice}</p> </p>
            <p className='yousave'>You Save:₹{mrp-saleprice}</p>
        </div>
        <a href={`/product/${a.producttype}/${a.id}`}>
        <button  className='showmore-btn'>Detail{`->`}</button></a>
    </div>
</div>
  )
}

export default Productcontainer;