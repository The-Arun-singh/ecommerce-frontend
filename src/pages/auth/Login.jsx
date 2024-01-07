import React, { useState } from 'react'
import "../../styles/LoginSignup.css"
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// this component implements the login functionality
const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to login the user 
    const login = async (credentials) => {
        // console.log(credentials);
        try {
            await fetch("http://localhost:8000/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            }).then(res => {
                // console.log(res);
                return res.json();
            }).then(data => {
                // console.log(data);
                if (data.message === 'User successfully logedIn') {
                    toast.success(data.message)
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch({ type: 'LOGIN', payload: data.user });
                    navigate("/");
                } else {
                    toast.error(data.message)
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    dispatch({ type: 'LOGOUT' });
                    navigate("/login");
                }
            })

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials);
        e.target.reset();
    };

    return (
        <div className='loginSignupContainer'>
            <div className="col-sm-6 col-lg-4 m-auto rounded shadow p-3">
                <h1>Sign In</h1>
                <form name="form" onSubmit={handleSubmit}>
                    <div className=" p-1">
                        {/* <!-- using the form-label and form-control bootstrap classes for the styling of the form  --> */}
                        <lable htmlFor="email" className="form-label fs-5 fw-semibold">E-mail:</lable>
                        <input type="email" id="email" className="form-control" required onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
                    </div>
                    <div className=" p-1">
                        <lable htmlFor="password" className="form-label fs-5 fw-semibold">Password:</lable>
                        <input type="password" id="password" className="form-control" required onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                    </div>
                    <div className="p-2">
                        <input className="btn btn-warning text-center fw-semibold fs-5" name="login" type="submit" value="Sign In" />
                    </div>
                    <p className='p-2'>New customer? <NavLink to={'/signup'}>Create your Account</NavLink></p>
                    <p className='text-center fw-semibold'>All Rights Reserved</p>
                </form>
            </div>
        </div>
    )
}

export default Login