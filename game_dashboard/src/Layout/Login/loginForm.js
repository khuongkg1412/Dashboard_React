import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useNavigate} from "react-router-dom";
import "./loginForm.css"
import md5 from "md5";
const Logo = require('./Logo/logo_truong.png');
// const md5 = require("md5");

axios.defaults.withCredentials = true;

function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [wrongError, setWrongError] = useState("");
    const [emailError, setemailError] = useState("");
    var navigate = useNavigate();

    // const handleValidation = (event) => {
    //     let formIsValid = true;

    //     // if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //     //     formIsValid = false;
    //     //     setemailError("Invalid email address!");
    //     //     return false;
    //     // } else {
    //     //     setemailError("");
    //     //     formIsValid = true;
    //     // }

    //     // if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    //     //     formIsValid = false;
    //     //     setpasswordError("Only Letters and length must best min 8 Chracters and Max 22 Chracters");
    //     //     return false;
    //     // } else {
    //     //     setpasswordError("");
    //     //     formIsValid = true;
    //     // }

    //     return formIsValid;
    // };

    function Login(e, navigate) {
        e.preventDefault();


        let request = {
            email: document.getElementById('Email').value,
            password: document.getElementById('Password').value,
        }


        axios.get('http://localhost:3001/login/' + request.email + '/' + md5(request.password), request)//md5(md5(request.password))
            .then(respn => {
                if (respn.data != "no") {
                    setWrongError("");
                    alert("Welcome "+respn.data+"!");
            
                    localStorage.setItem("curent_Session", respn.data);
                    navigate("/dashboard");
                    
                } else {
                    setWrongError("The Email or Password is Incorrect!");
                    // alert("Wrong user name or password")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        var check = localStorage.getItem("curent_Session");
        if(check != null) navigate("/dashboard");
    }, []);

    return (
        <div className="bg-gradient-primary">
            < div className="container" >
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-12 col-xl-10">
                        <div className="card shadow-lg o-hidden border-0 my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-flex">
                                        <div className="flex-grow-1 bg-login-image" id="logo-game"></div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-center pb-4">
                                                <img width="70%" src={Logo} alt="Logo FPT" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-dark mb-4">Welcome!</h3>
                                            </div>
                                            <form className="user" onSubmit={(e) => Login(e, navigate)}>
                                                <div className="mb-3">
                                                    <input className="form-control form-control-user" type="email" id="Email" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email"
                                                        onChange={(event) => setEmail(event.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <input className="form-control form-control-user" type="password" id="Password" placeholder="Password" name="password"
                                                        onChange={(event) => setPassword(event.target.value)} />
                                                        <span className="mb-2 text-danger">{wrongError}</span>
                                                </div>
                                                <hr />
                                                <button className="btn btn-primary d-block btn-user w-100 fs-6" type="submit">Login</button>
                                                
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <footer class="bg-white sticky-footer">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Copyright © LTD2K 2022</span></div>
                </div>
            </footer>
        </div >
    );
}
export default Login;