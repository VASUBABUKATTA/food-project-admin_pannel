
import React, { useState } from 'react'
import {
  TextField, Button, Container, Typography, Box,
  Fab,
  Tooltip
} from "@mui/material";
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import p1 from '../../assets/pic1.webp'
import p2 from '../../assets/pic2.webp'
import p3 from '../../assets/pic3.webp'
import p4 from '../../assets/pic4.webp'
import p5 from '../../assets/pic5.webp'
import p6 from '../../assets/pic6.webp'
import './Home.css';
import Cards from './CardData';
import Footer from '../admin/Footer.jsx';
// import Fab from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';



function HomePage() {

 
const scrollToCards = () => {
  const element = document.getElementById("cards-section");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <>
    <div>
      <div className='text-light w-100 sticky-top' style={{ height: '60px', backgroundColor: 'midnightblue' }}>
        <div className='container w-100 h-100'>
          <div className='w-100 h-100 d-flex justify-content-between align-items-center'>
            <div>
              <h3>Queen's Drive In</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="home-container">
        {/* <h2 className="home-title">Order Food Easily by Scanning QR Code</h2>s */}
        <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}>
          <div>
            <img src={p1} alt="Food Order" />
            <p className="legend">A modern restaurant scene with a customer walking in and noticing a QR code placed on the table. The environment has a blue and white theme, with eleg</p>
          </div>
          <div>
            <img src={p2} alt="Fast Food" />
            <p className="legend">A customer using their smartphone to scan a QR code placed on the restaurant table. The screen displays a digital menu. The restaurant environment mai</p>
          </div>
          <div>
            <img src={p3} alt="Dining" />
            <p className="legend">A customer browsing a digital menu on their smartphone in a modern restaurant. The screen shows various food items with images and prices. The setting</p>
          </div>
          <div>
            <img src={p4} alt="Dining" />
            <p className="legend">A customer confirming their food order on a smartphone screen in a modern restaurant. The screen displays a summary of selected dishes with a 'Confirm</p>
          </div>
          {/* <div>
            <img src={p5} alt="Dining" />
            <p className="legend">A waiter bringing the ordered food to a customer's table in a modern restaurant. The setting follows a blue and white theme with stylish decor and war</p>
          </div> */}
          <div>
            <img src={p6} alt="Dining" />
            <p className="legend">A customer enjoying their meal in a modern restaurant with a blue and white theme. The table is set with delicious food, and the customer looks satisf</p>
          </div>
        </Carousel>
      </div>
     {/* Cards Section with ID for Scrolling */}
     <div id="cards-section">
        <Cards />
      </div>

      <div>
        <Footer />
      </div>

      {/* Floating Explore Button */}
      <Tooltip title="Explore" arrow>
      <Fab 
        color="primary" 
        aria-label="explore" 
        onClick={scrollToCards} 
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "midnightblue",
          color: "white",
          "&:hover": { backgroundColor: "darkblue" }
        }}
      >
        <ExploreIcon />
      </Fab>
      </Tooltip>
      
    </div>
  
  </>
  )
}

export default HomePage;
