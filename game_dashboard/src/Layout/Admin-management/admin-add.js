import avatarBackground from '../../img/khuong.jpg';
// import "./profile.css";
// import avatarBackground from "../../img/avatar.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate('/adminManagement');
    // }

    const [admin, setAdmin] = useState(new AdminModel());
    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Admin Management / Add a admin</h3>
                    </div>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span
                                className="d-none d-lg-inline me-2 text-gray-600 small">{admin.Username}</span>
                                <img className="border rounded-circle img-profile"
                                    src={avatarBackground} /></a>
                                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                    <a className="dropdown-item" href="#"><i
                                        className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid">

                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold text-center">Avatar</p>
                            </div>
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={avatarBackground} width="160" height="160" />
                                <div className="mb-3">
                                    <div className="file btn btn-primary btn-md">
                                        <input type={"file"} id="fileUpload" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Account Infomation</p>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email</strong></label>
                                                <input className="form-control" type="email" id="txt_email" placeholder="Enter an email (name@gmai.com)" required/>
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Nickname</strong></label>
                                                <input className="form-control" type="text" id="txt_admin_username" placeholder="Enter a nickname" required/>
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone</strong></label>
                                                <input className="form-control" type="text" id="txt_admin_phone" placeholder="Enter number phone" required/>
                                            </div>

                                            <div className="row">
                                                <div className="mb-3">
                                                    <button className="btn btn-primary btn-md btn-block" type="submit">
                                                        <i className="fas fa-plus-circle"></i><span>  Add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



};
export default AdminProfile;