import avatar from '../../img/khuong.jpg';

function adminProfile() {
    return (
        
            <div id="content">
                <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars"></i></button>
                        <div className="nav-item align-self-center">
                            <h3 className="text-dark mb-0">Profile</h3>
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
                                <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={avatar} width="160" height="160" />
                                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">Change
                                        Photo</button></div>
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
                                                        <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Name</strong></label><input className="form-control" type="text" id="first_name" placeholder="Khuong Nguyen" name="first_name" /></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Username</strong></label><input className="form-control" type="text" id="username" placeholder="khuongnv" name="last_name" /></div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Email</strong></label><input className="form-control" type="email" id="email" placeholder="khuongnvce140417@fpt.edu.vn" name="last_name" /></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" htmlFor="phone"><strong>Phone</strong></label><input className="form-control" type="text" id="last_name" placeholder="0866069699" name="last_name" /></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Update Profile</button></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Change Password</button></div>
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
export default adminProfile