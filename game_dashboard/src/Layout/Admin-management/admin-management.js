/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Card } from '@mui/material';

import DataTable from 'react-data-table-component';

import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../../App.css";
import AdminModel from "../../Model/admin";


const AdmimManagement = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/admin-add');
    }

    const [Q, setQ] = useState("");
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState(new AdminModel());
    var check = localStorage.getItem("curent_Session");
    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {

        if (check === "no" || check == null) navigate("/login");
        else {
            const getAdmins = async () => {
                await axios.request("http://localhost:3001/adminManagement").then(response => {
                    setData(response.data)
                })
            }
            const getAdmin = async () => {
                await axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                    setAdmin(res.data);
                });
            }
            getAdmins();
            getAdmin();
        }
    }, [check, navigate]);

    const changeStatus = ((email, status) => {
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

    async function Logout(e, navigate) {
        e.preventDefault();
        await axios.get('http://localhost:3001/logout')
        localStorage.clear();
        navigate("/login");
    }

    function search(rows) {
        return rows.filter((row) => row.Username.toLowerCase().indexOf (Q) > -1);
    }

    const columns = [
        {
            name: "Avatar",
            selector: (row) => row.Avatar,
            cell: (row) => (
                <div className="card-body text-center">
                    {
                        <img width="80px" height="80px" src={row.Avatar} alt="admin avatar" />
                    }
                </div>
            ),
            center: true
        },
        {
            name: "Full Name",
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
                        check === "khuongnvce140417@fpt.edu.vn"
                            ? (row.Status === 1
                                ? <FormControlLabel control={<Switch checked onClick={changeStatus(row.Email, row.Status)} />} label="Enable" />
                                : <FormControlLabel control={<Switch  onClick={changeStatus(row.Email, row.Status)} />} label="Disable" />)
                            : null
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
                <Card>
                    <div className="card-header py-3">
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-sm" onClick={handleClick} >
                                    <i className="fas fa-user-plus"></i><span>  Add a admin</span>
                                </button>
                            </div>
                            <div className="col-md-6">
                                <div className="text-lg-end dataTables_filter" id="dataTable_filter">
                                    <label className="form-label"><input onChange={(e) => setQ(e.target.value)} type="text" className="form-control form-control-sm"
                                        aria-controls="dataTable" placeholder="Search" value={Q}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={search(data)}
                        pagination
                    />

                </Card>
            </div>
        </div>
    );
};
export default AdmimManagement;