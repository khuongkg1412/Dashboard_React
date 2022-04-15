/* eslint-disable react-hooks/rules-of-hooks */
import avatar from '../../img/khuong.jpg';

import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Card } from '@mui/material';

import DataTable from 'react-data-table-component';

import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../../App.css";

const admimManagement = () => {
    let [data, setData] = useState([]);

    async function getAdmin() {
        await axios.request("http://localhost:3001/adminManagement").then(response => {
            setData(response.data)
        })
    }
    console.log(data);
    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        getAdmin();
        console.log("asdnkjansdoan")
    },[]);

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
            center: true
        },
        {
            name: "User name",
            selector: (row) => row.Username,
            sortable: true
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
            selector: (row) => row.Status,
            cell: () => (
                <div className="card-body">
                    {
                        data.Email == "khuongnvce140417@fpt.edu.vn" ? null
                            : data.Status == 1 ?
                                <FormControlLabel control={<Switch defaultChecked onClick={changeStatus(data.Email, data.Status)} />} label={data.Status} />
                                : <FormControlLabel control={<Switch onClick={changeStatus(data.Email, data.Status)} />} label={data.Status} />

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
                    <DataTable
                        title="Admin Account"
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
export default admimManagement;