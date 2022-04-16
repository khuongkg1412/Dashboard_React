import { Dropdown } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react'
import AdminModel from "../../Model/admin";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const UserManagement = () => {
    const navigate = useNavigate();

    let [data, setData] = useState([]);
    const [admin, setAdmin] = useState(new AdminModel());
    var check = localStorage.getItem("curent_Session");
    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {

        if (check == "no") navigate("/login");
        else {
            const getAdmin = async () => {
                await axios.request("http://localhost:3001/adminManagement").then(response => {
                    setData(response.data)
                })
                axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                    setAdmin(res.data);
                });
            }
            getAdmin();


        }
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
                        <h3 className="text-dark mb-0">User Management</h3>
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
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">User Information</p>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Level</th>
                                        <th>Stage</th>
                                        <th>Created date</th>
                                        <th>Enable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className="rounded-circle me-2" width="30" height="30" src={admin.Avatar} />Khuong Nguyen</td>
                                        <td>Male</td>
                                        <td>99</td>
                                        <td>99</td>
                                        <td>2022/02/25</td>
                                        <td><input className="form-check-input" type="checkbox" id="formCheck" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default UserManagement