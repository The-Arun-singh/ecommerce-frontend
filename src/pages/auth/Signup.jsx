import React, { useState } from 'react'
import '../../styles/LoginSignup.css'
import { NavLink, useNavigate } from 'react-router-dom'



// this component implements the signup/register functionality
const Signup = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    // function to register the user

    const createUser = async () => {
        try {
            await fetch("http://localhost:8000/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            }).then(res => res.json()).then(res => {
                console.log(res);
            })
            navigate('/login');
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser();
        e.target.reset();
    };


    return (
        <div className='loginSignupContainer'>
            <div className="col-sm-6 col-lg-4 m-auto rounded shadow p-3">
                <h1>Sign Up</h1>
                <form name="form" onSubmit={handleSubmit} >
                    <div className=" p-1">
                        <lable htmlFor="fname" className="form-label fs-5 fw-semibold">Name:</lable>
                        <input type="text" id="fname" className="form-control" required onChange={e => setUserData({ ...userData, fullName: e.target.value })} />
                    </div>
                    <div className=" p-1">
                        <lable htmlFor="email" className="form-label fs-5 fw-semibold">E-mail:</lable>
                        <input type="email" id="email" className="form-control" required onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    <div className=" p-1">
                        <lable htmlFor="password" className="form-label fs-5 fw-semibold">Password:</lable>
                        <input type="password" id="password" className="form-control" required onChange={e => setUserData({ ...userData, password: e.target.value })} />
                    </div>
                    <div className="p-2">
                        <input className="btn btn-warning text-center fw-semibold fs-5" name="login" type="submit" value="Sign Up" />
                    </div>
                    <p className='p-2'>Already have an account? <NavLink to={'/login'}>SignIn to your account</NavLink></p>
                    <p className='text-center fw-semibold'>All Rights Reserved</p>
                </form>
            </div>
        </div>
    )
}

export default Signup