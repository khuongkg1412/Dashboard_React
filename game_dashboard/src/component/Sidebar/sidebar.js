import "../../../src/App.css";
import gameLogo from '../../img/LTD2K.png';
import {useLocation} from 'react-router-dom'
function Sidebar() {
    let location = useLocation()

    if (location.pathname === '/login') return null

    return (
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
                        <a className="nav-link" href="/profile"><i
                            className="fas fa-user"></i><span>Profile</span></a></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/userManagement"><i
                            className="fas fa-table"></i><span>User Management</span></a></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/adminManagement"><i
                            className="fas fa-users-cog"></i><span>Admin Management</span></a></li>
                </ul>
            </div>
        </nav>
    )
}
export default Sidebar;