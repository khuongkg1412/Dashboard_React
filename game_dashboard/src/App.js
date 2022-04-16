import React, { useEffect, useState } from "react";
import { Route, Routes, Link, BrowserRouter, Navigate, useNavigate } from "react-router-dom";

// import { Chart } from 'chart.js';
import LoginForm from './Layout/Login/loginForm';
import Profile from './Layout/Profile/profile';
import ProfileUpdate from './Layout/Profile/profileUpdateFrom';
import Dashboard from './Layout/Dashboard/dashboard';
import AdminM from './Layout/Admin-management/admin-management';
import AddAdmin from './Layout/Admin-management/admin-add';
import UserM from './Layout/User-management/user-management';
import Sidebar from './component/Sidebar/sidebar';
import Footer from './component/Footer/footer';
import "./App.css";
import axios from "axios";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

axios.defaults.withCredentials = true;

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
              <Route path="/changePass" element={<ProfileUpdate />} />
              <Route path="/userManagement" element={<UserM />} />
              <Route path="/adminManagement" element={<AdminM />} />
              <Route path="/admin-add" element={<AddAdmin />} />
              <Route path="/login" element={<LoginForm />} />
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
