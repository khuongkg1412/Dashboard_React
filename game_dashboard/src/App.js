import React from "react";

import LoginForm from './Layout/Login/loginForm';
import Profile from './Profile/profile';
import Dashboard from './Layout/Dashboard/dashboard';
import Sidebar from '../src/component/Sidebar/sidebar';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

const isLogin = false;

function App() {

  if (!isLogin) {
    return (
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>)
  }
  else {
    return (
      <BrowserRouter>
        <div className="App">
          <div className='container'>
            <div className='navbar'>
              <Sidebar />
            </div>
            <div className='otherPages'>
              <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route exact path='/'>
                {/* navigate("/login"); */}
              </Route>
            </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
    isLogin = true;
  }
}


export default App;
