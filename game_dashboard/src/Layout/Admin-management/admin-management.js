/* eslint-disable react-hooks/rules-of-hooks */
import avatar from '../../img/khuong.jpg';

import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Card } from '@mui/material';
import { useNavigate } from "react-router-dom";

import DataTable from 'react-data-table-component';

import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../../App.css";

const AdmimManagement = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/admin-add');
    }

    let [data, setData] = useState([]);
    const token = localStorage.getItem("current_Session");

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {

        const getAdmin = async () => {
            await axios.request("http://localhost:3001/adminManagement").then(response => {
                setData(response.data)
            })
            console.log(data);
        }
        getAdmin();
    }, []);

    const changeStatus = useCallback((email, status) => {
        return async (e) => {
            if (status === 1) {
                axios.put("http://localhost:3001/adminManagement/disable/" + email).then(res => {
                    if (res.data === true) {
                        alert("Disable success");
                        window.location.reload(false);
                    } else {
                        alert("Disable fail");
                        window.location.reload(false);
                    }
                });
            } else {
                axios.put("http://localhost:3001/adminManagement/enable/" + email).then(res => {
                    if (res.data === true) {
                        alert("Enable success");
                        window.location.reload(false);
                    } else {
                        alert("Enable fail");
                        window.location.reload(false);
                    }
                });
            }
        }
    });

    const columns = [
        {
            name: "Avatar",
            selector: (row) => row.Avatar,
            cell: (row) => (
                <div className="card-body text-center">
                    {
                        <img width="80px" height="80px" src={row.Avatar} alt="display image" />
                    }
                </div>
            ),
            center: true
        },
        {
            name: "User name",
            selector: (row) => row.Username,
            sortable: true,
            center: true
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: true,
            center: true
        },
        {
            name: "Phone",
            selector: (row) => row.Phone,
            center: true
        },
        {
            name: "Status",
            selector: (row) => row.Status,
            cell: (row) => (
                <div className="card-body text-center">
                    {
                        row.Email == "khuongnvce140417@fpt.edu.vn" && null
                        || row.Status == 1 &&
                        <FormControlLabel control={<Switch defaultChecked onClick={changeStatus(row.Email, row.Status)} />} label="Enable" />
                        || <FormControlLabel control={<Switch onClick={changeStatus(row.Email, row.Status)} />} label="Disable" />

                    }
                </div>
            ),
            center: true

        }
    ];

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
                                <a id="dropdownMenuButton1" className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="/profile">
                                    <span className="d-none d-lg-inline me-2 text-gray-600 small">Khuong Nguyen</span>
                                    <img className="border rounded-circle img-profile" src={avatar} alt="avatar" />
                                </a>
                                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in" aria-labelledby="dropdownMenuButton1">
                                    <a className="dropdown-item" href="/logout">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>Logout
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid">
                <Card>
                    <div className="card-header py-3">
                        <div className="row">
                            <div class="col-md-6">
                                <button className="btn btn-primary btn-sm" onClick={handleClick} >
                                    <i className="fas fa-user-plus"></i><span>  Add a admin</span>
                                </button>
                            </div>
                            <div class="col-md-6">
                                <div class="text-lg-end dataTables_filter" id="dataTable_filter">
                                    <label class="form-label"><input type="search" class="form-control form-control-sm"
                                        aria-controls="dataTable" placeholder="Search" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        // title="Admin Account"
                        columns={columns}
                        data={data}
                        pagination
                        selectableRows
                    />

                </Card>
            </div>
        </div>
    );
};
export default AdmimManagement;