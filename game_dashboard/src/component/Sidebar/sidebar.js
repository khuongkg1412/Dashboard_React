import "../../../src/App.css";
import gameLogo from '../../img/LTD2K.png';
import { useLocation, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Sidebar() {
    let location = useLocation()
    const [active, setActive] = useState(location.pathname === '/admin-add' || location.pathname === '/adminManagement');
    

    useEffect(() => {
        setActive(location.pathname === '/admin-add' || location.pathname === '/adminManagement');
    }, [location.pathname]);

    if (location.pathname === '/login') return null

    return (
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0 sticky-top">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand mt-2" href="/dashboard">
                    <div className="sidebar-brand-icon"><img className="rounded-circle" width="45" height="45" src={gameLogo} alt="logo"/></div>
                    <div className="sidebar-brand-text mx-3 fs-4"><span>LTD2K</span></div>
                </a>
                <hr className="sidebar-divider my-1" />

                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item">
                        <NavLink to="/dashboard"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '0',
                                background: isActive ? 'rgb(29 61 124 / 35%)' : '0',
                            })}
                            className="nav-link">
                            <i className="fas fa-tachometer-alt"></i><span>Dashboard</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/userManagement"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '0',
                                background: isActive ? 'rgb(29 61 124 / 35%)' : '0',
                            })}
                            className="nav-link">
                            <i className="fas fa-table"></i><span>User Management</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/adminManagement"
                            style={({ isActive }) => ({
                                color: active ? '#fff' : '0',
                                background: active ? 'rgb(29 61 124 / 35%)' : '0',
                                fontWeight: active ? 'bold' : 'normal'
                            })}
                            className="nav-link">
                            <i className="fas fa-users-cog"
                                style={{
                                    fontWeight: active ? 'bold' : '',
                                    color: active ? '#fff' : '',
                                }}
                            ></i><span>Admin Management</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Sidebar;