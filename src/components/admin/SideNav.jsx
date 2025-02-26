import React, { useEffect, useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';
import { Box, Button, Typography, TextField, Container, Divider, } from '@mui/material';
import { ArrowBackIosTwoTone, Category, PriceChange, Restaurant, RestaurantMenu, Settings, StoreTwoTone } from '@mui/icons-material';
import Header from './Header';
import './SideNav.css';
import AddCounter from './AddCounter';

import Modal from 'react-bootstrap/Modal';
import Footer from './Footer';
// import './AddCounter.css';
import foodImage from '../../assets/pic6.webp';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';

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
            },

            {
                name: 'VADA',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                ]
            },]

    },
    {
        counterName: 'counter2',
        Categorys: [

            {
                name: 'ABC',
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
            },

            {
                name: 'DEF',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },
    {
        counterName: 'counter3',
        Categorys: [

            {
                name: 'GHI',
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
            },

            {
                name: 'JKL',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },

    {
        counterName: 'counter4',
        Categorys: [

            {
                name: 'STU',
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
            },

            {
                name: 'VXY',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },
    {
        counterName: 'counter5',
        Categorys: [

            {
                name: '123',
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
            },

            {
                name: '456',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },
    {
        counterName: 'counter6',
        Categorys: [

            {
                name: '789',
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
            },

            {
                name: 'jguh',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },
    {
        counterName: 'counter7',
        Categorys: [

            {
                name: 'nbh',
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
            },

            {
                name: 'jbj',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
            },]

    },
    {
        counterName: 'counter8',
        Categorys: [

            {
                name: 'MNO',
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
            },

            {
                name: 'PQR',
                menu: [
                    { name: 'Dahi Vada', price: '149', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Mini Vada Sambar Dip', price: '114', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Rasam Vada', price: '124', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Onion Pakooda', price: '105', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },
                    { name: 'Masala Vada', price: '90', imageLink: 'https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg' },

                ]
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
                <div className="col-6">
                    <Typography variant="h5" className="ms-1 " fontWeight="bold">
                        Counter Category And Item Details:
                    </Typography>
                </div>
                <div className="col-6 text-end">
                    <Button
                        variant="contained"
                        sx={{ width: { xs: "50%", md: "25%" }, height: "50px", mr: 3 }}
                        onClick={addCounter}
                    >
                        Add Counter
                    </Button>
                </div>
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
                                    className="card counter_bgimg rounded p-4 text-center"
                                    style={{
                                        width: "100%",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                                    onClick={() => handleMenu(index, category)}
                                >
                                    <div className="card-body">
                                        <h4 className="card-title">{category.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal for Adding Counter */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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

const [showColor,setShowColor]=useState(true);
const [showColor1,setShowColor1]=useState(true);
const [showColor2,setShowColor2]=useState(true);
const [showColor3,setShowColor3]=useState(true);


useEffect(()=>{
    console.log(window.location.pathname);
    const currentPath = window.location.pathname
    if(currentPath == '/nestead/sidenav'){setshowCounters(true)}
})

    return (
        <>
            <div style={{ width: "100%" }}>    <Header /></div>

            <div className='row'>
                {/* Sidebar Section */}
                <div className='col-2 sidenav' style={{ position: "relative" }}>

                    <div className=' mt-1'>
                        {/* <div className=' mx-3' style={{,textDecoration:"none",color:"red",fontWeight:"bold",fontSize:"20px"}} ><Link onClick={() => { setshowCounters(true) }}><Restaurant /></Link></div> */}
                         <div className='text-white mx-3 btn '><Link to="" style={{textDecoration:"none",color:"white",fontWeight:"bold",fontSize:"20px",}}  onClick={() => { setshowCounters(true);setShowColor(true);setShowColor1(false),setShowColor2(false),setShowColor3(false) }}>
                         <Restaurant /> Couters List 
                        </Link></div>

                        

                        <> {showCounters ? (
                            <div style={{ height: "300px", overflow: "" }}>

                               
                                <Box
                                    sx={{
                                        margin:"10px",
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
                                            borderRadius:"8px" // Scrollbar width
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
                                                       style={{border:"2px solid black" , borderRadius:"15px",}}
                                                       sx={{ backgroundColor: selectedIndex === index ? "blue" : "white",
                                                        color: '' }}
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

                        <div className='mb-2 mt-3 mx-1 text-white btn'><Link to="/nestead/sidenav/counters/all/Profiles" style={{textDecoration:"none",color:"white",fontWeight:"bold",fontSize:"20px"}}  onClick={() => { setshowCounters(false);setShowColor(false);setShowColor1(true),setShowColor2(false),setShowColor3(false) }}><StoreTwoTone /> Counter Profiles</Link></div>
                       
                        <div className=' mb-2 mx-3 text-white btn '><Link to="/nestead/sidenav/counters/Availability" style={{textDecoration:"none",color:"white",fontWeight:"bold",fontSize:"20px"}}  onClick={() => { setshowCounters(false) }}><RestaurantMenu /> Counters Avial</Link></div>

                        <div className='mx-3 text-white fw-bold btn'><Link to="/nestead/sidenav/settingsPannel" style={{textDecoration:"none",color:"white",fontWeight:"bold",fontSize:"20px"}} onClick={() => { setshowCounters(false) }}  ><Settings /> Settings </Link></div>
                    </div>

                </div>

                {/* Content Section */}
                <div className='col-10'>

                    {showCounters ? (<>
                        <Categorys categoryName={categoryName} /></>) : (<div style={{overflow:"auto",width:"100%",height:"680px"}} className='pt-3 ps-3 mt-3'><Outlet sty /></div>)}
                </div>


            </div>
            <div style={{ width: "100%" }}>
                <Footer />
            </div>
        </>
    );
}

export default SideNav

