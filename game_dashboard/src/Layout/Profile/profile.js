import avatarBackground from '../../img/khuong.jpg';
// import "./profile.css";
// import avatarBackground from "../../img/avatar.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/changePass');
       }

    const [admin, setAdmin] = useState(new AdminModel());
    useEffect(() => {
        axios.get("http://localhost:3001/adminManagement/getAdmin/khuongnvce140417@fpt.edu.vn").then((res) => {
            setAdmin(res.data);
        });
    }, []);
    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Profile</h3>
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
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={avatarBackground} width="160" height="160" />
                                <div className="mb-3"><button className="btn btn-primary btn-sm"><input type={"file"} id="fileUpload" />Change
                                    Photo</button></div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Admin Settings</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className="row">
                                            <input className="form-control" type="hidden" id="txt_status" value={admin.Status == 1 ? "Enable" : "Disable"} readOnly="true" />
                                                
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email</strong></label><input className="form-control" type="email" id="txt_email" value={admin.Email} readOnly={true} /></div>
                                                </div>

                                            </div>
                                            <div className="row">
                                            <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Nickname</strong></label><input className="form-control" type="text" id="txt_admin_username" defaultValue={admin.Username} /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone</strong></label><input className="form-control" type="text" id="txt_admin_phone" defaultValue={admin.Phone} name="last_name" /></div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Update Profile</button></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Change Password</button></div>
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

    function handleSubmit(e) {
        e.preventDefault();
        const { txt_admin_username, txt_admin_phone } =
            e.target.elements;
        var adminUpdate = new AdminModel(
            admin.Avatar,
            admin.Email,
            admin.Password,
            txt_admin_phone.value,
            txt_admin_username.value,
            admin.Status
        );
        console.log(adminUpdate);
        axios
            .put(
                "http://localhost:3001/adminManagement/update/" + admin.Email,
                adminUpdate
            )
            .then((res) => {
                alert("Update success");
            });
    }

};
export default AdminProfile;