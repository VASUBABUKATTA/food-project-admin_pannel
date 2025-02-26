import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Dashboard, Restaurant, RestaurantMenu, Settings, StoreTwoTone } from '@mui/icons-material';
import MenuItems from './Menu Items';
import Availability from './Availability';
import Dashboard1 from '../admin/Dashboard';
import SideNav from './SideNav';
import B from './B';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <Dashboard /> },
  { segment: 'nestead/sidenav', title: 'Counters', icon: <Restaurant />, children:[
    {segment: 'counter1',title: 'Counter1'},
    {segment: 'counter1',title: 'Counter1'},
    {segment: 'counter1',title: 'Counter1'},
    {segment: 'counter1',title: 'Counter1'},
    {segment: 'counter1',title: 'Counter1'},
  ]} ,
  { segment: 'nestead/sidenav/counters/all/Profiles', title: 'Counter Profiles', icon: <StoreTwoTone /> },
  { segment: 'nestead/sidenav/counters/Availability', title: 'Counters Availability', icon: <RestaurantMenu /> },
  { segment: 'nestead/sidenav/settingsPannel', title: 'Settings', icon: <Settings /> },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box>
      <Typography>Dashboard content for {pathname}</Typography>
      {pathname == "/nestead/sidenav/settingsPannel" ? (<><MenuItems/></>):(<></>)}
      {pathname == "/nestead/sidenav/counters/Availability" ? (<><Availability/></>):(<></>)}
      {pathname == "/nestead/sidenav/counters/all/Profiles" ? (<><Dashboard1 /></>):(<></>)}
      {pathname == "/nestead/sidenav" ? (<><B /></>):(<></>)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Queens Drive In',
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

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
