import avatarBackground from '../../img/default.png';
// import "./profile.css";
// import avatarBackground from "../../img/avatar.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

const AdminProfile = () => {

    const navigate = useNavigate();
    //variable use for check input
    const [phoneError, setPhoneError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [listphone, setListPhone] = useState([]);
    const [listEmail, setListEmail] = useState([]);

    //API get Phone list to check duplicate
    function getPhoneList() {
        axios.get("http://localhost:3001/adminManagement/listPhone").then(async res => {
            setListPhone(res.data);
        });
    }
    //API get Email list to check duplicate
    function getEmailList() {
        axios.get("http://localhost:3001/adminManagement/listEmail").then(async res => {
            setListEmail(res.data);
        });
    }
    //Funciton button handle submit event to add new admin
    function handleSubmit(e) {
        e.preventDefault();
        var txt_FullName = document.getElementById('txt_admin_username').value;
        var txt_Phone = document.getElementById('txt_admin_phone').value;
        var txt_Email = document.getElementById('txt_email').value;
        var isvalidFullName = checkFullName(txt_FullName);
        var isvalidPhone = checkPhone(txt_Phone);
        var isvalidEmail = checkEmail(txt_Email);
        var isvalidInput = isvalidFullName && isvalidPhone && isvalidEmail;
        if (isvalidInput) {
            const { txt_admin_username, txt_admin_phone, txt_email } =
                e.target.elements;
            var adminAdd = new AdminModel(
                "https://firebasestorage.googleapis.com/v0/b/ltd2k-fptk14.appspot.com/o/AdminAvatar%2Fdefault.png?alt=media&token=7bd0e19f-d8c3-4b4f-8b95-35fa86242251",
                txt_admin_username.value,
                txt_email.value,
                txt_admin_phone.value,
                1,
                md5("Fpt@1234")
            );
            console.log(adminAdd);
            axios
                .put("http://localhost:3001/adminManagement/add", adminAdd)
                .then((res) => {
                    if (res) {
                        alert("Add successfully!");
                        navigate('/adminManagement');
                    }
                    else alert("Add Fail!");
                });
        }
    }


    const [admin, setAdmin] = useState(new AdminModel());
    var check = localStorage.getItem("curent_Session");
    //Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        if (check === "no" || check == null) { navigate("/login") }
        else {
            const getAdmin = async () => {
                await axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                    setAdmin(res.data);
                });
            }
            getAdmin();
            getPhoneList();
            getEmailList();
        }
    }, [check, navigate]);

    //Logout the system
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
                        <h3 className="text-dark mb-0">Admin Management / Add a admin</h3>
                    </div>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <Dropdown className="nav-item">
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="nav-link">
                                <span className="d-none d-lg-inline me-2 text-gray-600 small">{admin.Username}</span>
                                <img className="border rounded-circle img-profile" src={admin.Avatar} alt="avatar" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">
                                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" ></i>Profile
                                </Dropdown.Item>
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
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold text-center">Avatar</p>
                            </div>
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={avatarBackground} alt="" width="160" height="160" />
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
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email</strong></label>
                                                <input className="form-control border" type="text" id="txt_email" placeholder="Enter an email (name@gmai.com)" />
                                                <span className="mb-2 text-danger ">{emailError}</span>
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Full Name</strong></label>
                                                <input className="form-control border" type="text" id="txt_admin_username" placeholder="Enter Full Name" />
                                                <span className="mb-2 text-danger">{fullNameError}</span>
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone Number</strong></label>
                                                <input className="form-control border" type="text" id="txt_admin_phone" placeholder="Enter Phone Number" />
                                                <span className="mb-2 text-danger">{phoneError}</span>
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
    //check duplicate phone number
    function checkDuplicatePhone(phone) {
        var check = listphone.find(e => e == phone);
        if (check) {
            return true;
        } else {
            return false;
        }
    }
    //check duplicate email
    function checkDuplicateEmail(email) {
        var check = listEmail.find(e => e == email);
        if (check) {
            return true;
        } else {
            return false;
        }
    }
    //check string empty
    function isRequired(input) {
        if (input === "") {
            return true;
        } else {
            return false;
        }
    }
    //check phone input
    function checkPhone(phone) {
        var isvalid = false;
        if (isRequired(phone)) {
            setPhoneError("Phone Number cannot be blank!");
            isvalid = false;
            errorPhone();
        } else if (!phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)) {
            setPhoneError("Your Phone Number is invalid (Example: 84987654321 or 0987654321)");
            isvalid = false;
            errorPhone();
        } else if (checkDuplicatePhone(phone)) {
            setPhoneError("This Phone Number is already being used!");
            isvalid = false;
            errorPhone();
        } else {
            setPhoneError("");
            isvalid = true;
            acceptedPhone();
        }
        return isvalid;
    }

    //validation full name
    function checkFullName(fName) {
        var isvalid = false;
        if (isRequired(fName)) {
            setFullNameError("Full Name cannot be blank!");
            isvalid = false;
            errorFullName();
        } else if (!fName.match(/^(?:([a-zA-Z]{1,10}\.){0,1} ?([a-zA-Z]{1,10})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{1,10} ){0,2}([A-Za-z']{1,10})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/)) {
            setFullNameError("Full Name consists of 2 or more words and must not contain special characters (Example: Huy Nguyen, Tran Nhu Y)");
            isvalid = false;
            errorFullName();
        } else {
            setFullNameError("");
            isvalid = true;
            acceptedFullName();
        }
        return isvalid;
    }

    //check email input
    function checkEmail(email) {
        var isvalid = false;
        if (isRequired(email)) {
            setEmailError("Email cannot be blank!");
            isvalid = false;
            errorEmail();
        } else if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            setEmailError("Your Email is invalid (Example: name@name.name)");
            isvalid = false;
            errorEmail();
        } else if (checkDuplicateEmail(email)) {
            setEmailError("This Email is already being used!");
            isvalid = false;
            errorEmail();
        } else {
            setEmailError("");
            isvalid = true;
            acceptedEmail();
        }
        return isvalid;
    }
    //START border input
    function acceptedFullName() {
        var element = document.getElementById("txt_admin_username");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function acceptedEmail() {
        var element = document.getElementById("txt_email");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function acceptedPhone() {
        var element = document.getElementById("txt_admin_phone");
        element.classList.add("border-success");
        element.classList.remove("border-danger");
    }
    function errorFullName() {
        var element = document.getElementById("txt_admin_username");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }
    function errorEmail() {
        var element = document.getElementById("txt_email");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }
    function errorPhone() {
        var element = document.getElementById("txt_admin_phone");
        element.classList.add("border-danger");
        element.classList.remove("border-success");
    }//END border input



};
export default AdminProfile;