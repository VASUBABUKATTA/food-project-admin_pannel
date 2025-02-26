
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import foodLogo from '../../assets/pic13.webp'

import { Link, Outlet, useNavigate } from 'react-router-dom';

// Material-UI Components
import {
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  createTheme,
} from '@mui/material';

// Material-UI Icons
import {
  HomeOutlined as HomeOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  TuneOutlined as TuneOutlinedIcon,
  ArrowBackIosTwoTone as ArrowBackIosTwoToneIcon,
  Category,
  PriceChange,
  Restaurant,
  RestaurantMenu,
  Settings,
  StoreTwoTone,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Dashboard,
  ArrowBackIosTwoTone,
  People,
  Logout,
} from '@mui/icons-material';

// Bootstrap Modal
import Modal from 'react-bootstrap/Modal';

// Custom Components
import Header from './Header';
import Footer from './Footer';
// import SideNav from './SideNav';
import AddCounter from './AddCounter';
// import MenuItems from './MenuItems'; // Fixed path issue (removed space in 'Menu Items')
import Availability from './Availability';
import Dashboard1 from '../admin/Dashboard';
import B from './B';

// Assets
import foodImage from '../../assets/pic6.webp';

// Toolpad Core
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

// CSS
import './SideNav.css';
import MenuItems from './Menu Items';

const sidenav = [

  { icon: <HomeOutlinedIcon />, name: 'Dashboard', path: '' },
  { icon: <AccessTimeOutlinedIcon />, name: 'Counter Availability', path: 'Availability' },
  { icon: <TuneOutlinedIcon />, name: 'Settings', path: 'settings' }

]

const counters = [
  {
    counterName: 'counter1',
    Categorys: [
      {
        name: 'IDLY',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://www.awesomecuisine.com/wp-content/uploads/2007/11/Idli-with-sambar-and-chutney.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://res.cloudinary.com/gagan/image/upload/h_450,w_600,f_auto,q_auto/v1653662086/preset_folder/nq5lhrpglokiwqsjvyuh.jpg' },
          { name: 'Ghee Sambar Buttor Idly', price: '143', imageLink: 'https://th.bing.com/th/id/OIP.HEdepfX-L3jIwPkTuQNWOQAAAA?rs=1&pid=ImgDetMain' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        CategoryImgageUrl:'https://5.imimg.com/data5/SELLER/Default/2023/3/296179680/PK/JO/EG/186596495/ready-made-idli-ready-to-eat-idly-1000x1000.jpeg',
      },

      {
        name: 'VADA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
        ],
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/idli-vada-south-indian-food_57665-11440.jpg?w=2000',
      },
    ]
   
  },
  {
    counterName: 'counter2',
    Categorys: [

      {
        name: 'DOSA',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        
        CategoryImgageUrl:'https://parcelkaro.in/wp-content/uploads/2022/12/Cheese-Dosa.jpg',
     
      },

      {
        name: 'UPMA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        
        CategoryImgageUrl:'https://th.bing.com/th/id/OIP.boBBw90ShLIHl5l9pQvbQgHaE7?rs=1&pid=ImgDetMain',
     
      },]

  },
  {
    counterName: 'counter3',
    Categorys: [

      {
        name: 'NON-VEG-BIRYANI',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/dum-handi-chicken-biryani-is-prepared-earthen-clay-pot-called-haandi-popular-indian-non-vegetarian-food_466689-52344.jpg?w=2000',
     
      },

      {
        name: 'VEG-BIRYANI',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        CategoryImgageUrl:'https://th.bing.com/th/id/OIP.UMDA_P6vhTTGd0Ao0cDZJgHaHa?rs=1&pid=ImgDetMain',
      },]

  },

  {
    counterName: 'counter4',
    Categorys: [

      {
        name: 'ICECREAMS',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },


        ],
        
        CategoryImgageUrl:'https://th.bing.com/th/id/OIP.BTFJnebv-bm1gY6KAw8GzwHaE8?rs=1&pid=ImgDetMain',
     
      },

      {
        name: 'cAKES',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ]
        ,
        CategoryImgageUrl:'https://images5.alphacoders.com/404/thumb-1920-404896.jpg',
      },]

  },
  {
    counterName: 'counter5',
    Categorys: [

      {
        name: 'IDLY',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },


        ],
        
        CategoryImgageUrl:'https://5.imimg.com/data5/SELLER/Default/2023/3/296179680/PK/JO/EG/186596495/ready-made-idli-ready-to-eat-idly-1000x1000.jpeg',
     
      },

      {
        name: 'VADA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/idli-vada-south-indian-food_57665-11440.jpg?w=2000',
      },]

  },
  {
    counterName: 'counter6',
    Categorys: [

      {
        name: 'IDLY',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        
        CategoryImgageUrl:'https://5.imimg.com/data5/SELLER/Default/2023/3/296179680/PK/JO/EG/186596495/ready-made-idli-ready-to-eat-idly-1000x1000.jpeg',
     
      },

      {
        name: 'VADA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/idli-vada-south-indian-food_57665-11440.jpg?w=2000',
      },]

  },
  {
    counterName: 'counter7',
    Categorys: [

      {
        name: 'IDLY',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        
        CategoryImgageUrl:'https://5.imimg.com/data5/SELLER/Default/2023/3/296179680/PK/JO/EG/186596495/ready-made-idli-ready-to-eat-idly-1000x1000.jpeg',
     
      },

      {
        name: 'VADA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/idli-vada-south-indian-food_57665-11440.jpg?w=2000',
      },]

  },
  {
    counterName: 'counter8',
    Categorys: [

      {
        name: 'IDLY',
        menu: [
          { name: 'Plain Idly', price: '85', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Pudi Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Sambar Button Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ghee Idly', price: '143', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Lemon Idly', price: '114', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Kanchipuram Idly', price: '100', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Banglore Idli', price: '81', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Rasam Tari Idli', price: '140', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Ragi Balls', price: '145', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },
          { name: 'Idiyappam', price: '180', imageLink: 'https://chakriskitchen.com/wp-content/uploads/2018/12/Idly19.jpg' },

        ],
        
        CategoryImgageUrl:'https://5.imimg.com/data5/SELLER/Default/2023/3/296179680/PK/JO/EG/186596495/ready-made-idli-ready-to-eat-idly-1000x1000.jpeg',
     
      },

      {
        name: 'VADA',
        menu: [
          { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
          { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

        ],
        CategoryImgageUrl:'https://img.freepik.com/premium-photo/idli-vada-south-indian-food_57665-11440.jpg?w=2000',
      },]

  },
];



const Menu = ({ menu, onBack }) => {
  console.log(menu);

  return (
    <div className="">
      <div className='d-flex'>
        <ArrowBackIosTwoTone
          onClick={onBack}
          style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold" }}
        />

        <h4 className="ms-2">Category : </h4><h4 className=" text-primary">&nbsp;{menu.name}</h4>
      </div>
      <h4 className="ms-2 mb-2" style={{ fontWeight: "bold", color: "midnightblue" }}>Items list : </h4>



      <div style={{ height: "500px", overflow: "auto" }}>
        <div className="container">
          <div className="row g-3">
            {menu.menu.map((item, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div
                  className="card w-100 h-100 shadow-sm"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    borderRadius: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={item.imageLink}
                    alt="Menu Items"
                    className="img-fluid"
                    style={{ borderRadius: "10px 10px 0 0", height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="text-xl font-semibold text-center" style={{ height: "30px" }}>
                      {item.name}
                    </h5>
                    <h6 className="fs-5">₹{item.price}.00/-</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div >
  );
};



// const [showAddCounter, SetShowAddCounter] = useState(false);

const Categorys = ({ categoryName }) => {
  console.log(categoryName);

  const [category, setCategory] = useState(categoryName.length == 0 ? counters[0].Categorys : categoryName);

  const [menu, setMenu] = useState([]);

  const [a, setA] = useState(false)
  const [a1, setA1] = useState(false)

  const handleMenu = (index, category) => {
    console.log(index, category);
    setMenu(category);
    setA(true);
  }
  // Function to go back to category view
  const goBack = () => {
    setA(false);
  };

  useEffect(() => {
    setCategory(categoryName);
    setA(false)
  }, [categoryName])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    ownerName: "",
    mobileNo: "",
    email: "",
    counterName: "",
    imagePath: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagePath: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
    setShow(!show);
  };

  const addCounter = () => {
    setShow(true)
  }


  return (
    <>
      {/* Header Section */}
      <div className="row mt-3" style={{ backgroundClip: "aliceblue" }}>
        <div className="col-12">
          <Typography variant="h5" className="ms-1 " fontWeight="bold">
            Counter Category And Item Details:
          </Typography>
        </div>
        {/* <div className="col-6 text-end">
          <Button
            variant="contained"
            sx={{ width: { xs: "50%", md: "25%" }, height: "50px", mr: 3 }}
            onClick={addCounter}
          >
            Add Counter
          </Button>
        </div> */}
      </div>

      {/* Category Section */}
      <div className="container" >
        <div className="row" style={{ backgroundClip: "aliceblue" }}>
          {a ? (
            <Menu menu={menu} onBack={goBack} style={{ backgroundClip: "aliceblue" }} />
          ) : (
            category.map((category, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div
                  className="card rounded  text-center"
                  style={{
                    width: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                  onClick={() => handleMenu(index, category)}
                >
                  <img
                    src={category.CategoryImgageUrl}
                    alt="Menu Items"
                    className="img-fluid"
                    style={{ borderRadius: "10px 10px 0 0", height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-primary fs-3 fw-bold">{category.name}</h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Adding Counter */}
      <Modal show={show} onHide={handleClose} style={{marginTop:'35px'}} backdrop="static" keyboard={false}>
        {/* <Modal.Header closeButton>
                    <Modal.Title className="text-center">ADD COUNTER</Modal.Title>
                </Modal.Header> */}
        <Modal.Body>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: "bold", fontSize: '20px' }}>
            ADD COUNTER
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Owner Name" name="ownerName"
              value={formData.ownerName} onChange={handleChange}
              margin="normal" required
              // style={{border:'2px light black'}}
              variant='outlined'
            />
            <TextField
              fullWidth label="Mobile Number" name="mobileNo" type="tel"
              value={formData.mobileNo} onChange={handleChange}
              margin="normal" required
            />
            <TextField
              fullWidth label="Email" name="email" type="email"
              value={formData.email} onChange={handleChange}
              margin="normal" required
            />
            <TextField
              fullWidth label="Counter Name" name="counterName"
              value={formData.counterName} onChange={handleChange}
              margin="normal" required
            />

            {/* Upload Image */}
            <div className="d-flex align-items-center gap-2 mt-3">
              <Button
                variant="contained" component="label"
                sx={{ width: "40%", height: "40px" }}
              >
                Upload Image
                <input type="file" hidden required onChange={handleImageChange} />
              </Button>
              {formData.imagePath && (
                <Typography variant="body2">
                  Selected: {formData.imagePath.name}
                </Typography>
              )}
            </div>

            {/* Submit Button */}
            {/* <div className="text-center mt-4">
                            <Button 
                                type="submit" variant="contained" color="primary" 
                                sx={{ width: "50%" }}
                            >
                                Submit
                            </Button>
                        </div> */}
            <div className='row container justify-content-between align-items-center'>
              <div className='col-6'>
                <Button variant="contained" color="white" sx={{ mt: 3 }} onClick={handleClose}>
                  Cancel
                </Button></div>
              <div className='col-6'>
                <Button type='submit' variant="contained" color="primary" sx={{ mt: 3 }}>
                  Submit
                </Button></div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );

}


function SideNav() {


  const [showCounters, setshowCounters] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [categoryName, setCounterCategory] = useState(counters[0].Categorys);

  const handleListItemClick = (index, Categorys) => {
    console.log(Categorys);
    setSelectedIndex(index);
    setCounterCategory(Categorys);
  };

  useEffect(() => {
    console.log(categoryName);
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showColor, setShowColor] = useState(true);
  const [showColor1, setShowColor1] = useState(true);
  const [showColor2, setShowColor2] = useState(true);
  const [showColor3, setShowColor3] = useState(true);


  useEffect(() => {
    console.log(window.location.pathname);
    const currentPath = window.location.pathname
    if (currentPath == '/nestead/sidenav' || '/a') { setshowCounters(true) }
  })

  return (
    <>
      <div style={{ width: "100%" }}>    <Header /></div>

      <div className='row'>
        {/* Sidebar Section */}
        <div className='col-2 sidenav' style={{ position: "relative" }}>

          <div className=' mt-1'>
            {/* <div className=' mx-3' style={{,textDecoration:"none",color:"red",fontWeight:"bold",fontSize:"20px"}} ><Link onClick={() => { setshowCounters(true) }}><Restaurant /></Link></div> */}
            <div className='text-white mx-3 btn '><Link to="" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px", }} onClick={() => { setshowCounters(true); setShowColor(true); setShowColor1(false), setShowColor2(false), setShowColor3(false) }}>
              <Restaurant /> Couters List
            </Link></div>



            <> {showCounters ? (
              <div style={{ height: "300px", overflow: "" }}>


                <Box
                  sx={{
                    margin: "10px",
                    width: "90%",  // Adjust width
                    height: "300px", // Fixed height to enable scrolling
                    overflowY: "auto", // Enables vertical scroll only when content overflows
                    overflowX: "hidden", // Hides horizontal scroll
                    // border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    // bgcolor: "white",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                      borderRadius: "8px" // Scrollbar width
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "blue", // Scrollbar color
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f0f0f0", // Track color
                    }
                  }}
                >
                  {/* <div className='text-center text-white mb-2 '>
                              <Typography variant='h6' width="100%" height="25px" fontWeight="bold">Available Counters</Typography>
                          </div> */}
                  <List component="nav" aria-label="main mailbox folders" >
                    {counters.map((counter, index) => (
                      <Link to="" className="text-decoration-none text-center text-dark" key={index}>
                        <div style={{ position: "" }}>
                          {selectedIndex === index && (
                            <>

                              {/* Horizontal Line Below
                                          <div style={{
                                              position: "absolute",
                                              bottom: "-3px",
                                              left: 0,
                                              width: "95%",
                                              height: "5px",
                                              backgroundColor: "blue",
                                              borderRadius: "3px",
                                              marginLeft: "15px"
                                          }}></div> */}
                            </>
                          )}
                          <Button
                            variant='outlined'
                            // className='px-5 py-2 btn btn-'
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(index, counter.Categorys.map(category => category))}
                            style={{ border: "2px solid black", borderRadius: "15px", }}
                            sx={{
                              backgroundColor: selectedIndex === index ? "blue" : "white",
                              color: ''
                            }}
                          >
                            <ListItemText
                              primary={counter.counterName}
                              primaryTypographyProps={{
                                sx: {
                                  // fontSize: "15px",
                                  fontWeight: "bold",
                                  color: selectedIndex === index ? "white" : "primary",
                                  textAlign: "center",
                                  // backgroundColor: selectedIndex === index ? "" : "",
                                  // border:"2px solid black"
                                }
                              }}
                            />
                          </Button>
                        </div>
                      </Link>
                    ))}
                  </List>
                </Box>
              </div>) : (<></>)}</>

            <div className='mb-2 mt-3 mx-1 text-white btn'><Link to="/nestead/sidenav/counters/all/Profiles" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => { setshowCounters(false); setShowColor(false); setShowColor1(true), setShowColor2(false), setShowColor3(false) }}><StoreTwoTone /> Counter Profiles</Link></div>

            <div className=' mb-2 mx-3 text-white btn '><Link to="/nestead/sidenav/counters/Availability" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => { setshowCounters(false) }}><RestaurantMenu /> Counters Avial</Link></div>

            <div className='mx-3 text-white fw-bold btn'><Link to="/nestead/sidenav/settingsPannel" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => { setshowCounters(false) }}  ><Settings /> Settings </Link></div>
          </div>

        </div>

        {/* Content Section */}
        <div className=''>

          {showCounters ? (<>
            <Categorys categoryName={categoryName} /></>) : (<></>)}
        </div>


      </div>
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
}

function SidebarNavigation({ counters }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItemButton onClick={handleToggle}>
        <ListItemIcon>
          <Restaurant />
        </ListItemIcon>
        <ListItemText primary="Counters" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {counters.map((counter) => (
          <ListItemButton key={counter.counterName} sx={{ pl: 4 }}>
            <ListItemText primary={counter.counterName} />
          </ListItemButton>
        ))}
      </Collapse>
      {/* Render other menu items below */}
    </List>
  );
}


const handleLogout =()=>{
  // navigate('/');
}

const NAVIGATION = [
  { kind: 'header', title: <Typography  sx={{color:'#ffffff'}}>Menu Items</Typography>},
  // { segment: 'dashboard', title: 'Dashboard', icon: <Dashboard /> },
  {
    segment: "/abc",
    title: "Counters",
    icon: <Restaurant sx={{color: '#ffffff !important'}} />,
    children: counters.map((counter) => ({
      segment: counter.counterName,
      title: <Button variant='contained' sx={{color:'#ffffff',fontWeight:'bold',border:'2px solid black',borderRadius:'8px 8px 8px 8px',width:'200px'}}>{counter.counterName}</Button>
      // icon: <People sx={{color: '#ffffff !important'}} />
    })),
  },
  { segment: 'nestead/sidenav/counters/all/Profiles', title: 'Counter Profiles', icon: <StoreTwoTone sx={{color: '#ffffff !important'}} /> },
  { segment: 'nestead/sidenav/counters/Availability', title: 'Counters Availability', icon: <RestaurantMenu sx={{color: "#ffffff !important"}} /> },
  { segment: 'nestead/sidenav/settingsPannel', title: 'Settings', icon: <Settings sx={{color: '#ffffff !important'}} />   },
  { segment: 'logout', title: 'Logout', icon: <Box><Logout sx={{color: '#ffffff !important'}} className='vasu'  /> </Box>}
]; 




const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  // colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
      paper: "#191970",
    },
   
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#191970",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#ffffff", // Ensures primary text is white
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black', 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black', 
          },
        },
      },
    },
   MuiIconButton:{
    styleOverrides:{
      root:{
        color:'#ffffff'
      }
    }
   },
   
  },
});




function DemoPageContent({ pathname }) {
  const [categoryName, setCounterCategory] = useState(counters[0].Categorys);
  const [state,setState] = useState(false);

  console.log(pathname);


  const navigate =useNavigate();
  if(pathname == '/logout')
  {
    navigate('/')
  }

  // useEffect(()=>{
  //     console.log(window.location.pathname);
  //     const currentPath = window.location.pathname
  //     if(currentPath == '/nestead/sidenav'){setState(true)}
  // })

useEffect(() => {
  if (pathname.startsWith("/c")) {
        const parts = pathname.split("/");
        const counterName = parts[1]; 
        const foundCounter = counters.find(
          (counter) => counter.counterName === counterName
        );
        if (foundCounter) {
          setCounterCategory(foundCounter.Categorys);
          setState(true);
        }
      }
      else if (pathname.startsWith("/")) {
        const parts = pathname.split("/");
        const counterName = parts[1]; 
        const foundCounter = counters.find(
          (counter) => counter.counterName === counterName
        );
        if (foundCounter) {
          setCounterCategory(foundCounter.Categorys);
          setState(true);
        }
      }

  // For these specific routes, state should be false.
  if (
    pathname.startsWith("/nestead/sidenav/counters/all/Profiles") ||
    pathname.startsWith("/nestead/sidenav/counters/Availability") ||
    pathname.startsWith("/nestead/sidenav/settingsPannel")
  ) {
    setState(false);
  }else{
    setState(true)
  }
}, [pathname]);

console.log(state,pathname);


  return (
    <Box className='mt-2'>
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
      {pathname == "/nestead/sidenav/settingsPannel" ? (<><MenuItems /></>) : (<></>)}
      {pathname == "/nestead/sidenav/counters/Availability" ? (<><Availability /></>) : (<></>)}
      {pathname == "/nestead/sidenav/counters/all/Profiles" ? (<><Dashboard1  /></>) : (<></>)}
      {/* {pathname == "/nestead/sidenav" ? (<><B /></>) : (<></>)} */}
      {state? (<><Categorys categoryName={categoryName} /></>) : <></>}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter('/counters');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Link to='/'> <img src={foodLogo} style={{borderRadius:'50%',textDecoration:'none'}} alt="MUI logo" /></Link>,
        title:<Link to='/' style={{textDecoration:'none'}}> <Typography variant='h5' sx={{color:'#ffffff',fontWeight:'bold'}}>The Place Drive In</Typography></Link>,
        homeUrl: '/toolpad/core/introduction',
        
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;


