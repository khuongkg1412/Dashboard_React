import avatarBackground from '../../img/khuong.jpg';
// import "./profile.css";
// import avatarBackground from "../../img/avatar.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

const AdminProfile = () => {
    const [oldPassError, setOldPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [rePassError, setRePassError] = useState("");
    const [admin, setAdmin] = useState(new AdminModel());
    useEffect(() => {
        axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
            setAdmin(res.data);
        });
    }, []);
    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Profile / Change password</h3>
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

                    <div className="col-lg-6">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Change your password</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Current Password</strong></label><input className="form-control" type="password" id="cur_pass" placeholder="Your current password" maxLength="32" /></div>
                                                </div>
                                                <span>{oldPassError}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>New Password</strong></label><input className="form-control" type="password" id="new_pass" placeholder="New password" maxLength="32" /></div>
                                                </div>
                                                <span>{newPassError}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Confirm Password</strong></label><input className="form-control" type="password" id="confirm_pass" placeholder="Confirm password" maxLength="32" /></div>
                                                </div>
                                                <span>{rePassError}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><button className="btn btn-primary btn-md" type="submit">Change Password</button></div>
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

    function checkOldPassword(oldpassword) {
        var isvalid = false;
        if (oldpassword == "") {
            setOldPassError("Old password cannot be blank");
            isvalid = false;
        } else if (md5(oldpassword) != admin.Password) {
            setOldPassError("Password is wrong");
            isvalid = false;
        } else {
            setOldPassError("");
            isvalid = true;
        }
        return isvalid;
    }

    function checkNewPassword(oldpassword,newpassword) {
        var isvalid = false;
        if (newpassword == "") {
            setNewPassError("New password cannot be blank");
            isvalid = false;
        } else if (!newpassword.match()) {
            setNewPassError("Regex");
            isvalid = false;
        }else if (oldpassword === newpassword) {
            setOldPassError("New password must be difference from old password");
            isvalid = false;
        } else {
            setNewPassError("");
            isvalid = true;
        }
        return isvalid;
    }

    function checkRePassword(newpassword, repassword) {
        var isvalid = false;
        if (repassword == "") {
            setRePassError("Confirm password cannot be blank");
            isvalid = false;
        } else if (repassword != newpassword) {
            setRePassError("Confirm");
            isvalid = false;
        } else {
            setRePassError("");
            isvalid = true;
        }
        return isvalid;
    }

    function handleSubmit(e) {
        e.preventDefault();

        var oldpass = document.getElementById('cur_pass').value;
        var newpass = document.getElementById('new_pass').value;
        var repass = document.getElementById('confirm_pass').value;

        var isvalidOldPass = checkOldPassword(oldpass),
            isvalidNewPass = checkNewPassword(oldpass,newpass),
            isvalidRePassword = checkRePassword(newpass, repass);

        if (isvalidNewPass && isvalidOldPass && isvalidRePassword) {
            console.log("nguuuuuuuuuuuuuu");
            axios
                .put(
                    "http://localhost:3001/adminManagement/changePassword/" + localStorage.getItem("curent_Session") + "/" + md5(repass)
                )
                .then((res) => {
                    alert("Change password success!");
                });
        }


    }

};
export default AdminProfile;