

import React from 'react'
import Header from './Header'
import { Link, Outlet } from 'react-router-dom'
import { Restaurant, RestaurantMenu, Settings, StoreTwoTone } from '@mui/icons-material';
import Footer from './Footer';
// import Footer from './Footer';

function SideNav1() {
  return (
    <div>
        <div className=''>  <Header/></div>
    
        
          <div className='mb-3' style={{ width: "100px", height: "700px", backgroundColor: "midnightblue" }}>
             
             <div className=''>
                 <div className='mb-5 mx-3 '><Link to="/nestead/sidenav/a"><StoreTwoTone /></Link></div>
                 <div className='mb-5 mx-3'><Link to="/nestead/sidenav/b"><Restaurant /></Link></div>
                 <div className='mb-5 mx-3'><Link to="/nestead/sidenav/c"><RestaurantMenu /></Link></div>
                 <div className='mx-3'><Link to="/nestead/sidenav/c"><Settings /></Link></div>
             </div>

           
             <div className='col-11 d-flex' style={{overflow:"auto"}}>
                 <Outlet />
             </div>
         </div> 
            <div><Footer/></div>
    </div>
  )
}

export default SideNav1

