import React from 'react'
import HomePage from './components/admin/AdminHomePage'
import { Route, Routes } from 'react-router-dom'
import SideNav1 from './components/admin/SideNav1'
import Dashboard from './components/admin/Dashboard'
import A from './components/admin/A'
import B from './components/admin/B'
import C from './components/admin/C'
import Header from './components/admin/Header'
import GlobalSideNav from './components/ModifiedAdminModule/GlobalSideNav'
import MenuItems from './components/admin/Menu Items'
import SideNav from './components/admin/SideNav'
import Availability from './components/admin/Availability'
import GlobalSideNav1 from './components/admin/SideNav'
import AppProviderBasic from './components/admin/A'
import AdminLoginCredentials from './components/admin/AdminLoginPage'
// import Availability from './components/admin/CountersAvailability'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/logout' element={<HomePage />} />
        <Route path='/admin/Login' element={<AdminLoginCredentials />} />
        {/* <Route path='/a' element={<AppProviderBasic />} /> */}
        <Route path='/nestead/sidenav' element={<B />} />

         <Route path="/nestead/sidenav" element={<B />}>
          <Route index element={<B />} />
          <Route path="counters/all/Profiles" element={<Dashboard />} />
          <Route path="counters/Availability" element={<Availability/>} />
         
          <Route path="settingsPannel" element={<MenuItems />} />
        </Route>
      </Routes> 

    </div>
  )
}

export default App
