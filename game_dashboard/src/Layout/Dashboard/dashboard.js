import { Dropdown } from 'react-bootstrap';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import AdminModel from "../../Model/admin";
import { Line } from "react-chartjs-2";


function Dashboard() {
    var navigate = useNavigate();
    var check = localStorage.getItem("curent_Session");

    const [data, setData] = useState([]);
    const [statictis, setStatictis] = useState([]);
    const [admin, setAdmin] = useState(new AdminModel());
    useEffect(() => {
        if (check === "no" || check === null) navigate("/login")
        else {
            const getChartData = async () => {
                await axios.request("http://localhost:3001/dashboard/").then(response => {
                    setData(response.data)
                })
            }
            const getStatictisData = async () => {
                await axios.request("http://localhost:3001/dashboard/statictis").then(response => {
                    setStatictis(response.data)
                })
            }
            const getAdmin = async () => {
                await axios.get("http://localhost:3001/adminManagement/getAdmin/" + localStorage.getItem("curent_Session")).then((res) => {
                    setAdmin(res.data);
                });
            }
            getChartData();
            getStatictisData();
            getAdmin();
        }
    }, []);

    async function Logout(e, navigate) {
        e.preventDefault();
        await axios.get('http://localhost:3001/logout')
        localStorage.clear();
        navigate("/login");
    }

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Number of account in current year",
                data: data,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    return (
        <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                    <div className="nav-item align-self-center">
                        <h3 className="text-dark mb-0">Dashboard</h3>
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
                <div className="row">
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-primary py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Total Account</span></div>
                                        <div className="text-dark fw-bold h5 mb-0"><span>{statictis[0]}</span></div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-user fa-2x text-gray-300"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-success py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-success fw-bold text-xs mb-1"><span>Total Player</span></div>
                                        <div className="text-dark fw-bold h5 mb-0"><span>{statictis[1]}</span></div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-user-check fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-info py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-info fw-bold text-xs mb-1"><span>Total Items</span></div>
                                        <div className="row g-0 align-items-center">
                                            <div className="col-auto">
                                                <div className="text-dark fw-bold h5 mb-0 me-3"><span>{statictis[2]}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-boxes fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-warning py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-warning fw-bold text-xs mb-1"><span>Total Achievement</span></div>
                                        <div className="text-dark fw-bold h5 mb-0"><span>{statictis[3]}</span></div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-clipboard-list fa-2x text-gray-300"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-7 col-xl-8">
                        <div className="card shadow mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h6 className="text-primary fw-bold m-0">Player Register Overview</h6>
                                <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i
                                    className="fas fa-ellipsis-v text-gray-400"></i></button>
                                    <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                        <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
                                        <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Line data={chartData} />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-xl-4">
                        <div class="card shadow mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="text-primary fw-bold m-0">Top 5 Player with Highest Level </h6>
                            </div>
                            <div class="card-body">
                                <div class="chart-area">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard