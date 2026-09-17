import React, { useState, navigate } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cardetails from './pages/Cardetail';
import Cars from './pages/Cars';
import Mybookings from './pages/Mybookings';
import Footer from './components/Footer'; // Importing Footer component
import Layout from './pages/owner/Layout';
import Dashboard from './pages/owner/Dashboard';
import Addcars from './pages/owner/AddCars';
import ManageBookings from './pages/owner/ManageBookings';
import ManageCars from './pages/owner/ManageCars';
import Login from './components/Loginpage';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext'
const App = () => {

  const { showLogin } = useAppContext();
  const isownerPath = useLocation().pathname.includes('/owner');
  return (
    < >
      <Toaster />
      {showLogin && <Login />}

      {!isownerPath && <  Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<Cardetails />} />
        <Route path="/my-bookings" element={<Mybookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<Addcars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-cars" element={<ManageCars />} />
        </Route>
      </Routes>

      {!isownerPath && < Footer />}

    </>
  )
}

export default App;