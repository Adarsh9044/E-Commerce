import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import eleventh from './Images/bannerimages/eleventh.jpg';
import tenth from './Images/bannerimages/tenth.jpg';
import ninth from './Images/bannerimages/ninth.jpg';
const Banner = () => {


    
   return (
    <Carousel slide={false}>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src={ninth}
          alt="firstimg"
        />
        <Carousel.Caption>
          <h3>Easy Shopping</h3>
          <p>Now Product is at your door</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={tenth}
          alt="secondimg"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={eleventh}
          alt="thirdimg"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>);

    
};




export default Banner;