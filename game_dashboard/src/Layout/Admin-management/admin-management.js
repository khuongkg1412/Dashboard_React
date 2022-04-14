/* eslint-disable react-hooks/rules-of-hooks */
import avatar from '../../img/khuong.jpg';

import axios from 'axios'
import React, { useState, useEffect } from 'react'



const admimManagement = () => {
    const [data, setData] = useState([]);

    async function getAdmin() {
        await axios.request("http://localhost:3001/adminManagement").then(response => {
            console.log(response.data);
            setData(response.data)
        })
    }

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        getAdmin()
    }, []);

    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Admin Management</h3>
                    </div>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <div className="d-none d-sm-block topbar-divider"></div>
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow">
                                <a id="dropdownMenuButton1" className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                    <span className="d-none d-lg-inline me-2 text-gray-600 small">Khuong Nguyen</span>
                                    <img className="border rounded-circle img-profile" src={avatar} />
                                </a>
                                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in" aria-labelledby="dropdownMenuButton1">
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>Logout
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Admin Information</p>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {data.length > 0 && (
                                <tbody>
                                    {data.map(data => (
                                    <tr>
                                        <td><img className="rounded-circle me-2" width="30" height="30" src={avatar} />{data.Username}</td>
                                        <td>{data.Email}</td>
                                        <td>{data.Phone}</td>
                                        <td><input className="form-check-input" type="checkbox" id="formCheck" /></td>
                                    </tr>
                                    ))}
                                </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default admimManagement;