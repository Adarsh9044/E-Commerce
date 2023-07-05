import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
const Pgfof = () => {
  return (
    <div><Navbar/>
    <p>404 page not found</p>
    <button><Link to='/'>Go Back</Link></button>
</div>
  )
}

export default Pgfof;