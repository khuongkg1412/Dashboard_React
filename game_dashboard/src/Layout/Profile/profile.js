import { Dropdown } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminModel from "../../Model/admin";
import { useNavigate } from "react-router-dom";
import { app } from '../../config';


const AdminProfile = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/changePass');
    }
    const reloadPage = () => {
        navigate(0);
    }
    const [avatarLoad, setAvatarLoad] = useState(null);
    const storage = app.storage();



    const [admin, setAdmin] = useState(new AdminModel());
    const [IDadmin, setIDAdmin] = useState("");

    useEffect(() => {
        const getAdmin = async () => {
            await axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                setAdmin(res.data);
            });
        }
        const getAdminID = async () => {
            axios.get("http://localhost:3001/adminManagement/getAdminId/" + localStorage.getItem("curent_Session")).then((res) => {
                setIDAdmin(res.data);
            });
        }

        getAdmin();
        getAdminID();
    }, []);
    console.log(admin);
    async function Logout(e, navigate) {
        e.preventDefault();
        await axios.get('http://localhost:3001/logout')
        localStorage.clear();
        navigate("/login");
    }
    useEffect(() => {

        const avat = document.querySelector("#avatarView");
        const photoUpload = document.querySelector("#fileUpload");

        photoUpload.addEventListener("change", function () {
            const chosenPhoto = this.files[0];

            if (chosenPhoto) {
                const photoReader = new FileReader();

                photoReader.addEventListener("load", function () {
                    avat.setAttribute("src", photoReader.result);
                });
                photoReader.readAsDataURL(chosenPhoto);
            }
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
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={admin.Avatar} width="160" height="160" id="avatarView" />
                                <div className="mb-3">
                                    <div className="file btn btn-primary btn-md">
                                        <input type={"file"} id="fileUpload"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => { setAvatarLoad(e.target.files[0]) }} />
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
                                        <p className="text-primary m-0 fw-bold">Admin Settings</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => handleSubmit(e)}>

                                            <div className="row">
                                                <input className="form-control" type="hidden" id="txt_status" value={admin.Status === 1 ? "Enable" : "Disable"} readOnly="true" />

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
                                                    <div className="mb-3">
                                                        <button className="btn btn-primary btn-md" type="submit">
                                                            <i className="fas fa-edit"></i><span>  Save Change</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <button className="btn btn-primary btn-md" type="button" onClick={handleClick}>
                                                            <i className="fas fa-lock"></i><span>  Change Password</span>
                                                        </button>
                                                    </div>
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


    async function handleSubmit(e) {
        e.preventDefault();
        const storageRef = storage.ref("AdminAvatar/");
        const fileRef = storageRef.child(IDadmin + ".png");
        await fileRef.put(avatarLoad);
        fileRef.getDownloadURL().then(res => {
            var imageURL = res;
            const { txt_admin_username, txt_admin_phone } =
                e.target.elements;
            var adminUpdate = new AdminModel(
                imageURL,
                txt_admin_username.value,
                admin.Email,
                txt_admin_phone.value,
                admin.Status,
                admin.Password,
            );
            console.log(adminUpdate);
            axios
                .put(
                    "http://localhost:3001/adminManagement/update/" + localStorage.getItem("curent_Session"),
                    adminUpdate
                )
                .then((res) => {
                    alert("Update successfully!");
                    reloadPage();

                });
        });


    }


};
export default AdminProfile;