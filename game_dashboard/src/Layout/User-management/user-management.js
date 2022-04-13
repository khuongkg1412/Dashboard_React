import avatar from '../../img/khuong.jpg';

function userManagement() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                        <div className="nav-item align-self-center">
                            <h3 className="text-dark mb-0">User Management</h3>
                        </div>
                        <ul className="navbar-nav flex-nowrap ms-auto">
                            <div className="d-none d-sm-block topbar-divider"></div>
                            <li className="nav-item dropdown no-arrow">
                                <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span
                                    className="d-none d-lg-inline me-2 text-gray-600 small">Khuong Nguyen</span><img
                                        className="border rounded-circle img-profile"
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
                                            <td><img className="rounded-circle me-2" width="30" height="30" src={avatar} />Khuong Nguyen</td>
                                            <td>Male</td>
                                            <td>99</td>
                                            <td>99</td>
                                            <td>2022/02/25</td>
                                            <td><input className="form-check-input" type="checkbox" id="formCheck" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img className="rounded-circle me-2" width="30" height="30" src={avatar} />Hai Long</td>
                                            <td>Male</td>
                                            <td>99</td>
                                            <td>99</td>
                                            <td>2022/02/26</td>
                                            <td><input className="form-check-input" type="checkbox" id="formCheck" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img className="rounded-circle me-2" width="30" height="30" src={avatar} />Huynh Duy</td>
                                            <td>Male</td>
                                            <td>99</td>
                                            <td>99</td>
                                            <td>2022/02/28</td>
                                            <td><input className="form-check-input" type="checkbox" id="formCheck" /></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <nav className="d-lg-flex justify-content-lg-center dataTables_paginate paging_simple_numbers">
                                    <ul className="pagination">
                                        <li className="page-item disabled"><a className="page-link" aria-label="Previous" href="#"><span aria-hidden="true">«</span></a></li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" aria-label="Next" href="#"><span
                                            aria-hidden="true">»</span></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © LTD2K 2022</span></div>
                </div>
            </footer>
        </div>
    )
}
export default userManagement