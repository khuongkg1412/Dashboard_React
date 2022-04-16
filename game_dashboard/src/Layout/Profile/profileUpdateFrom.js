import { Dropdown } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

const AdminProfile = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/profile');
    }

    const [oldPassError, setOldPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [rePassError, setRePassError] = useState("");
    const [admin, setAdmin] = useState(new AdminModel());
    useEffect(() => {
        axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
            setAdmin(res.data);
        });
    }, []);
    async function Logout(e, navigate) {
        e.preventDefault();
        await axios.get('http://localhost:3001/logout')
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Profile / Change password</h3>
                    </div>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <Dropdown className="nav-item">
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="nav-link">
                                <span className="d-none d-lg-inline me-2 text-gray-600 small">{admin.Username}</span>
                                <img className="border rounded-circle img-profile" src={admin.Avatar} alt="avatar" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={(e) => Logout(e, navigate)}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" ></i>Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                                                    <div className="mb-1"><label className="form-label" htmlFor="first_name"><strong>Current Password</strong></label><input className="form-control border" type="password" id="cur_pass" placeholder="Your current password" maxLength="32" /></div>
                                                </div>
                                                <span className="mb-2 text-danger">{oldPassError}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-1"><label className="form-label" htmlFor="username"><strong>New Password</strong></label><input className="form-control border" type="password" id="new_pass" placeholder="New password" maxLength="32" /></div>
                                                </div>
                                                <span className="mb-2 text-danger">{newPassError}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-1"><label className="form-label" htmlFor="username"><strong>Confirm Password</strong></label><input className="form-control border" type="password" id="confirm_pass" placeholder="Confirm password" maxLength="32" /></div>
                                                </div>
                                                <span className="mb-2 text-danger">{rePassError}</span>
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
            errorPass1();
        } else if (md5(oldpassword) != admin.Password) {
            setOldPassError("Password is wrong");
            isvalid = false;
            errorPass1();
        } else {
            setOldPassError("");
            isvalid = true;
            acceptedPass1();
        }
        return isvalid;
    }

    function checkNewPassword(oldpassword, newpassword) {
        let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,32}$/;
        var isvalid = false;
        if (newpassword == "") {
            setNewPassError("New password cannot be blank");
            isvalid = false;
            errorPass2();
        } else if (!newpassword.match(regex)) {
            setNewPassError("Password must have at least one Uppercase Character, Lowercase Character, Digit, Special Symbol, 8-32 Characters Long and must not contain Whitespaces");
            isvalid = false;
            errorPass2();
        } else if (oldpassword === newpassword) {
            setOldPassError("New password must be difference from old password");
            isvalid = false;
            errorPass2();
        } else {
            setNewPassError("");
            isvalid = true;
            acceptedPass2();

        }
        return isvalid;
    }

    function checkRePassword(newpassword, repassword) {
        var isvalid = false;
        if (repassword == "") {
            setRePassError("Confirm password cannot be blank");
            isvalid = false;
            errorPass3();
        } else if (repassword != newpassword) {
            setRePassError("Confirm");
            isvalid = false;
            errorPass3();
        } else {
            setRePassError("");
            isvalid = true;
            acceptedPass3();
        }
        return isvalid;
    }

    function handleSubmit(e) {
        e.preventDefault();

        var oldpass = document.getElementById('cur_pass').value;
        var newpass = document.getElementById('new_pass').value;
        var repass = document.getElementById('confirm_pass').value;

        var isvalidOldPass = checkOldPassword(oldpass),
            isvalidNewPass = checkNewPassword(oldpass, newpass),
            isvalidRePassword = checkRePassword(newpass, repass);

        if (isvalidNewPass && isvalidOldPass && isvalidRePassword) {
            console.log("Check valid!");
            axios
                .put(
                    "http://localhost:3001/adminManagement/changePassword/" + localStorage.getItem("curent_Session") + "/" + md5(repass)
                )
                .then((res) => {
                    alert("Change password successfully!");
                    handleClick();
                });
        }
    }
    function acceptedPass1() {
        var element = document.getElementById("cur_pass");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function acceptedPass2() {
        var element = document.getElementById("new_pass");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function acceptedPass3() {
        var element = document.getElementById("confirm_pass");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function errorPass1() {
        var element = document.getElementById("cur_pass");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }
    function errorPass2() {
        var element = document.getElementById("new_pass");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }
    function errorPass3() {
        var element = document.getElementById("confirm_pass");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }


};
export default AdminProfile;