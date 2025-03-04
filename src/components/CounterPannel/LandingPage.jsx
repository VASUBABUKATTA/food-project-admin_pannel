import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Dashboard from './Dashboard';
import Menu from './Menu';
import Availability from './Availability';
import Settings from './Settings';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import foodLogo from '../../assets/pic13.webp'
import { Link, useNavigate } from 'react-router-dom';
import CounterMenuItems from './CounterMenuItems';
import { Logout } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon  sx={{ color: '#ffffff !important',}} />,
    },
    {
        segment: 'menu',
        title: 'Menu',
        icon: <MenuBookOutlinedIcon  sx={{ color: '#ffffff !important',}} />,
    },
    {
        segment: 'menuAvailability',
        title: 'Menu Availability',
        icon: <EventAvailableOutlinedIcon  sx={{ color: '#ffffff !important',}}/>,
    },
    {
        segment: 'settings',
        title: 'Settings',
        icon: <SettingsOutlinedIcon  sx={{ color: '#ffffff !important',}}/>,
    },
    { segment: 'CounterPannel/Login', title: 'Logout', icon: <Box><Logout sx={{ color: '#ffffff !important' }} className='vasu' /> </Box> }
 
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
  // palette: {
  //   background: {
  //     paper: "#191970",
  //   },

  // },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#191970", // Dark Blue
          color: "#ffffff", // White text for contrast
        },
      },
    },
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    },

  },
});



function DemoPageContent({ pathname }) {

    
      const [pathname1,setPathName1]=useState('');
    
  const navigate = useNavigate();
  // if (pathname == '/CounterPannel/Login') {
  //   toast.success("Logout Successfull!", {
  //     position: "top-right",
  //     autoClose: 5000, // Closes after 3 seconds
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   navigate('/CounterPannel/Login')
  // }

useEffect(() => {
  console.log(pathname);
  
    if (pathname === "/CounterPannel/Login") {
      confirmAlert({
        title: "Confirm Logout",
        message: "Are you sure you want to log out from the application?",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              
              navigate('/CounterPannel/Login'); // Redirect after logout
              
              toast.success("Logout Successful!", {
                position: "top-right",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              // Perform logout logic (clear local storage, session, etc.)
              localStorage.clear();
              sessionStorage.clear();
              
            }
          },
          {
            label: "Cancel",
            onClick: () => {
              setPathName1(pathname1);
              
            }
          }
        ]
      });
    }
    else{
      setPathName1(pathname)
    }
  }, [pathname]);

  return (
    <Box className='p-3'>
       
          {pathname1 == "/dashboard" ? (<> <Dashboard/> </>) : (<></>)}
          {pathname1 == "/menu" ? (<> <CounterMenuItems/></>) : (<></>)}
          {pathname1 == "/menuAvailability" ? (<> <Availability/></>) : (<></>)}
          {pathname1 == "/settings" ? (<> <Settings/> </>) : (<></>)}

       
        </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Link to='/CounterPannel/Login'> <img src={foodLogo} style={{ borderRadius: '50%', textDecoration: 'none' }} alt="MUI logo" /></Link>,
        title: <Link to='/CounterPannel/Login' style={{ textDecoration: 'none' }}> <Typography variant='h5' sx={{ color: '#ffffff', fontWeight: 'bold' }}>The Place Drive In</Typography></Link>,
        homeUrl: '/toolpad/core/introduction',
        
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
