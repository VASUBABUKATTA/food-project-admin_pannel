import React from 'react'
import HomePage from './components/admin/AdminHomePage'
import { Route, Routes } from 'react-router-dom'
import B from './components/admin/B';
import Dashboard from './components/admin/Dashboard';
import Availability from './components/admin/Availability';
import MenuItems from './components/admin/Menu Items';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/logout' element={<HomePage />} />
      
        {/* <Route path='/nestead/sidenav' element={<B />} /> */}

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