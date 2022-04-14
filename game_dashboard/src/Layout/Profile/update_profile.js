import React, { useState, useEffect } from "react";
import avatar from '../../img/khuong.jpg';


const apdateProfile = () => {
    // useEffect(() => {
    //     const avatarDiv = document.querySelector(".avatar-pic");
    //     const avat = document.querySelector("#avatar");
    //     const photoUpload = document.querySelector("#fileUpload");
    //     const uploadFileBtn = document.querySelector("#btn_upload_img");
    //     avatarDiv.addEventListener("mouseenter", function () {
    //         uploadFileBtn.style.display = "block";
    //     });

    //     avatarDiv.addEventListener("mouseleave", function () {
    //         uploadFileBtn.style.display = "none";
    //     });

    //     photoUpload.addEventListener("change", function () {
    //         const chosenPhoto = this.files[0];

    //         if (chosenPhoto) {
    //             const photoReader = new FileReader();

    //             photoReader.addEventListener("load", function () {
    //                 avat.setAttribute("src", photoReader.result);
    //             });
    //             photoReader.readAsDataURL(chosenPhoto);
    //         }
    //     });
    // }, []);
    return (

        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Update Profile</h3>
                    </div>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span
                                className="d-none d-lg-inline me-2 text-gray-600 small">Khuong Nguyen</span>
                                <img className="border rounded-circle img-profile"
                                    src={avatar} /></a>
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
                            <div className="card-body text-center shadow avatar-pic">
                                <img id="avatar" className="rounded-circle mb-3 mt-4" src={avatar} width="160" height="160" />

                                <div className="mb-3">
                                    <input type={"file"} id="fileUpload" />
                                    <label htmlFor="fileUpload" id="btn_upload_img">
                                        Change Photo
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">User Settings</p>
                                    </div>
                                    <div className="card-body">
                                        <form>

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Status</strong></label><input className="form-control" type="text" id="txt_status" placeholder="1" readOnly="true" required /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Username</strong></label><input className="form-control" type="text" id="txt_user_name" placeholder="Username" maxLength="20" required /></div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email</strong></label><input className="form-control" type="email" id="txt_email" placeholder="Email" maxLength="30" required /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone</strong></label><input className="form-control" type="text" id="txt_phone_number" placeholder="Number phone" maxLength="13" required /></div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><button id="btn_update_profile" className="btn btn-primary btn-sm" type="submit">Update</button></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><button id="btn_change_password" className="btn btn-primary btn-sm" type="submit">Cancel</button></div>
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
    )
}
export default apdateProfile