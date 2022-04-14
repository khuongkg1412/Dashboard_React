import avatar from '../../img/khuong.jpg';
function admimManagement() {
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
                                    <tbody>
                                        <tr>
                                            <td><img className="rounded-circle me-2" width="30" height="30" src={avatar} />khuongnv</td>
                                            <td>khuongnvce140417@fpt.edu.vn</td>
                                            <td>0866069699</td>
                                            <td><input className="form-check-input" type="checkbox" id="formCheck" /></td>
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
export default admimManagement