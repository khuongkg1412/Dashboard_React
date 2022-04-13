import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, Link } from "react-router-dom";
import LoginForm from './Layout/Login/loginForm';
import Profile from './Layout/Profile/profile';
import Dashboard from './Layout/Dashboard/dashboard';
import AdminM from './Layout/Admin-management/admin-management';
import UserM from './Layout/User-management/user-management';
import scriptChart from './bs-init';//import de chay hieu ung dashboard

import "./App.css";
import gameLogo from './img/LTD2K.png';


const isLogin = true;

function App() {

  // if (!isLogin) {
  //   return (
  //     <BrowserRouter>
  //       <LoginForm />
  //     </BrowserRouter>)
  // }
  // else {
  return (

    <div className="App" id="page-top">
      <div id="wrapper">
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
          <div className="container-fluid d-flex flex-column p-0">
            <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
              <div className="sidebar-brand-icon"><img className="rounded-circle" width="40" height="40" src={gameLogo} /></div>
              <div className="sidebar-brand-text mx-3"><span>LTD2K</span></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <ul className="navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item">
                {/* Dung Link thi dung logic cua router js hon la <a> */}
                <a className="nav-link" href="/dashboard"><i
                  className="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile"><i
                  className="fas fa-user"></i><span>Profile</span></Link></li>
              <li className="nav-item">
                <Link className="nav-link" to="/userManagement"><i
                  className="fas fa-table"></i><span>User Management</span></Link></li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminManagement"><i
                  className="fas fa-users-cog"></i><span>Admin Management</span></Link></li>

            </ul>
          </div>
        </nav>

        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <Routes>
              {/* Khi khop path thi render element mong muon */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userManagement" element={<UserM />} />
              <Route path="/adminManagement" element={<LoginForm />} />
            </Routes>
          </div>
          <footer className="bg-white sticky-footer">
            <div className="container my-auto">
              <div className="text-center my-auto copyright"><span>Copyright © LTD2K 2022</span></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    

  );
}


export default App;
