import React, { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { HandymanOutlined, Logout } from '@mui/icons-material';
import foodLogo from '../../assets/pic13.webp';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import CounterMenuItems from './CounterMenuItems';
import Dashboard from './Dashboard';
import Availability from './Availability';
import Settings from './Settings';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const demoTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#191970", color: "#ffffff" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#191970", width: '100vw' },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { color: '#ffffff' } },
    },
  },
});

function DemoPageContent({ pathname, counterName }) {
  const [currentPath, setCurrentPath] = useState(pathname);
  const [selectedNav, setSelectedNav] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const navMap = {
      "/dashboard": "Dashboard",
      "/": "Dashboard",
      "/menu": "Menu",
      "/menuAvailability": "Menu Availability",
      "/settings": "Settings",
      "/CounterPannel/Login": "Logout",
    };

    if (pathname === "/CounterPannel/Login") {
      confirmAlert({
        title: "Confirm Logout",
        message: "Are you sure you want to log out?",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              navigate('/CounterPannel/Login');
              toast.success("Logout Successful!", { autoClose: 3000 });
              localStorage.clear();
              sessionStorage.clear();
            },
          },
          { label: "Cancel", onClick: () => {} },
        ],
      });
    } else {
      setCurrentPath(pathname);
      setSelectedNav(navMap[pathname] || 'Dashboard');
    }
  }, [pathname, navigate]);

  return (
    <Box className='p-3'>
      <Typography variant="h5" color="primary" className="fw-bold">{counterName}</Typography>
      {/* <Typography variant="subtitle1" color="secondary" className="mt-2">
        You have selected: <strong>{selectedNav}</strong>
      </Typography> */}

      {currentPath === "/dashboard" || currentPath === "/" ? <Dashboard /> : null}
      {currentPath === "/menu" ? <CounterMenuItems /> : null}
      {currentPath === "/menuAvailability" ? <Availability /> : null}
      {currentPath === "/settings" ? <Settings /> : null}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  counterName: PropTypes.string,
};

function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const [counterName, setCounterName] = useState('');
  const mobdata = sessionStorage.getItem('mobieNo');
  const [selectedNav, setSelectedNav] = useState(router.pathname); 

  useEffect(() => {
    async function fetchCounterId() {
      try {
        const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
        if (response.status === 200) {
          setCounterName(response.data.message.COUNTERNAME.slice(0, 20) + "...");
        }
      } catch (error) {
        console.error("Error fetching counter ID:", error);
      }
    }
    fetchCounterId();
  }, [mobdata]);

  const NAVIGATION = [
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon sx={{color:'#ffffff !important'}} /> ,onclick:{}},
    { segment: 'menu', title: 'Menu', icon: <MenuBookOutlinedIcon sx={{color:'#ffffff !important'}} /> },
    { segment: 'menuAvailability', title: 'Menu Availability', icon: <EventAvailableOutlinedIcon sx={{color:'#ffffff !important'}}/> },
    { segment: 'settings', title: 'Settings', icon: <SettingsOutlinedIcon sx={{color:'#ffffff !important'}} /> },
    { segment: 'CounterPannel/Login', title: 'Logout', icon: <Logout sx={{color:'#ffffff !important'}}/> },
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Link to='/CounterPannel/MenuItems'><img src={foodLogo} alt="MUI logo" style={{ borderRadius: '50%' }} /></Link>,
        title: <Link to='/CounterPannel/MenuItems' style={{ textDecoration: 'none' }}>
          <Typography variant='h5' sx={{ color: '#ffffff', fontWeight: 'bold' }}>The Place Drive In</Typography>
        </Link>,
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} counterName={counterName} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
