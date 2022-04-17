import avatarBackground from '../../img/khuong.jpg';
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

    function handleSubmit(e) {
        e.preventDefault();
        const { txt_admin_username, txt_admin_phone, txt_email } =
            e.target.elements;
        var adminAdd = new AdminModel(
            "",
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

    const [admin, setAdmin] = useState(new AdminModel());
    var check = localStorage.getItem("curent_Session");
    useEffect(() => {

        if (check === "no" || check == null) navigate("/login");
        else {
            const getAdmin = async () => {
                await axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                    setAdmin(res.data);
                });
            }
            getAdmin();
        }
    }, [check, navigate]);

    const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

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
                                        <input type={"file"} id="fileUpload"onChange={handleChange} />
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
                                                <input className="form-control" type="email" id="txt_email" placeholder="Enter an email (name@gmai.com)" required />
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Nickname</strong></label>
                                                <input className="form-control" type="text" id="txt_admin_username" placeholder="Enter a nickname" required />
                                            </div>
                                            <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone</strong></label>
                                                <input className="form-control" type="text" id="txt_admin_phone" placeholder="Enter number phone" required />
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