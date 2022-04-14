import React, { useState } from "react";
import { Route, Routes, Link, BrowserRouter, Navigate } from "react-router-dom";
// import { Chart } from 'chart.js';

import LoginForm from './Layout/Login/loginForm';
import Profile from './Layout/Profile/profile';
import UpdateProfile from './Layout/Profile/update_profile';
import Dashboard from './Layout/Dashboard/dashboard';
import AdminM from './Layout/Admin-management/admin-management';
import UserM from './Layout/User-management/user-management';
import Sidebar from './component/Sidebar/sidebar';
import Footer from './component/Footer/footer';
import "./App.css";



function App() {
  return (
    <BrowserRouter>
      <div className="App" id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div className="d-flex flex-column" id="content-wrapper">

            <Routes>
              {/* Khi khop path thi render element mong muon */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userManagement" element={<UserM />} />
              <Route path="/adminManagement" element={<AdminM />} />
              <Route path="/" element={<LoginForm />} />
              <Route exact path='/' element={<Navigate to="/login" />} />
            </Routes>


            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
