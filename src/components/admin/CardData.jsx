import React from 'react';
import './Card.css';
import countersImage from '../../assets/pic8.webp';
import availabilityImage from '../../assets/pic9.jpeg'
import ordersImage from '../../assets/pic12.webp';
import menuImage from '../../assets/pic10.webp';
import { Link } from 'react-router-dom';
import { Fastfood, ManageAccounts, People, Restaurant, RestaurantMenu, Settings, Storefront } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';

const Cards = () => {
  return (
    <div className="cards-container">
      {/* Counters Card */}
      <Link to="/nestead/sidenav" style={{ textDecoration: "none" }}>
        <div className="card1">
          <div className="card-header1">
            <h3>COUNTERS <span className='text-white m-1'><Restaurant /></span> </h3>
          </div>
          <div className="card-body1">
            <img src={countersImage} alt="Counters" className="card-image1" />
            <div className="card-description1">
              <p>The "Counters Card" section provides an overview of restaurant counter management. It tracks the status of each counter, allowing easy monitoring and updates. The system ensures efficient service by displaying live counter availability and operational status.</p></div>
          </div>
        </div>
      </Link>
      {/* All Orders */}
      <Link to="/nestead/sidenav/" style={{ textDecoration: "none" }}>
        <div className="card1">
          <div className="card-header1">
            <h3>COUNTER PROFILES<span className='text-white m-1'><StoreIcon /></span> </h3>
          </div>
          <div className="card-body1">
            <img src={ordersImage} alt="All Orders" className="card-image1" />
            <div className="card-description1">
              <p>The "Counter Profile" Explore a variety of freshly prepared dishes at our interactive food counters, showcasing local and seasonal ingredients. Each counter offers a unique selection, ensuring quality and freshness. Our friendly staff delivers quick service, bringing you the best of our food project every time!</p>  </div>
          </div>
        </div>
      </Link>
      {/* Counters Availability */}
      <Link to="/nestead/sidenav/" style={{ textDecoration: "none" }}>
        <div className="card1">
          <div className="card-header1">
            <h3>COUNTER AVAILABILITY <span className='text-white '><RestaurantMenu /></span> </h3>
          </div>
          <div className="card-body1">
            <img src={availabilityImage} alt="Counters Availability" className="card-image1" />
            <div className="card-description1">
              <p>The "Counters Availability" section displays real-time status of active counters. It shows which counters are open or closed for service, ensuring smooth customer flow. The system helps optimize order processing by efficiently managing counter availability.</p>   </div>
          </div>
        </div>
      </Link>

      {/* Menu Items */}
      <Link to="/nestead/sidenav/" style={{ textDecoration: "none" }}>
        <div className="card1">
          <div className="card-header1 d-flex text-center align-items-center justify-content-center">
            <h3>SETTINGS<span className='m-1 '><Settings /></span></h3>
          </div>
          <div className="card-body1">
            <img src={menuImage} alt="Menu Items" className="card-image1" />
            <div className="card-description1">
              <p>The "Settings" The admin settings panel allows access to manage and update only the admin's own credentials. With a secure and user-friendly interface, admins can easily modify personal information and update login details, ensuring privacy and control over their account.</p> </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
