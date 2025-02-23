import React, { useState } from 'react';
import Header from './Header';
import AddCounter from './AddCounter'; // Ensure this is a function or a component as needed
import { AppBar, Toolbar, Button, Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import { styled } from '@mui/system';
import './AddCounter.css';
import SideNav from './SideNav';

function CountersCard() {
  
  const drawerWidth = 240;

  
  const [counters, setCounters] = useState([
    { name: 'Counter 1' },
    { name: 'Counter 2' },
    { name: 'Counter 3' },
  ]);

 

  return (
    <div>
      
     <div><SideNav/></div>

    </div>
  );
}

export default CountersCard;
