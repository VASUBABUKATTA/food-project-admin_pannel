import React from 'react'
import Header from '../admin/Header'
import { Link, Outlet } from 'react-router-dom';
import { Restaurant, RestaurantMenu, Settings, StoreTwoTone } from '@mui/icons-material';
import Footer from '../admin/Footer';

function GlobalSideNav() {
  return (
    <div>
    
  

   
      <div className="row" style={{ height: "700px" }}>
     
        <div className="col-1" style={{ width:"100px",backgroundColor: "midnightblue", padding: "10px" }}>
          <div className=''>
            <div className='mb-5 mx-3 '><Link to="/nestead/sidenav/counters/Availability"><StoreTwoTone /></Link></div>
            <div className='mb-5 mx-3'><Link to="/nestead/sidenav/counters/Availability1"><Restaurant /></Link></div>
            <div className='mb-5 mx-3'><Link to="/nestead/sidenav/counters/all/Profiles"><RestaurantMenu /></Link></div>
            <div className='mx-3'><Link to="/nestead/sidenav/settingsPannel"><Settings /></Link></div>
          </div>
        </div>

        <div className="col-10" style={{overflow:"auto",height:"690px",width:"93%"}} >
          <Outlet />
        </div>
      </div>
      <div style={{width:"100%"}}>
        <Footer/>
      </div>
    </div>
  );
}
export default GlobalSideNav
