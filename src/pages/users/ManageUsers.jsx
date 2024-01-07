import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import "../../styles/LoginSignup.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



// this component renders the page to display all the users to be managed by the admin.
const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllUsers = async () => {
        try {
            await fetch('http://localhost:8000/getusers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then(response => response.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setAllUsers(data.users)
                }
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllUsers();

    }, [])

    // console.log(allUsers);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => response.json()).then(data => toast.success(data.message));
            await getAllUsers();
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (<>
        <div className='loginSignupContainer'>
            <div className='container-fluid'>
                <h1 className='text-center my-5'>Manage Users</h1>
                <ul className='mx-5 my-3'>
                    {allUsers && allUsers.map(user => {
                        return (
                            <li className="rounded  d-flex shadow-sm p-2 justify-content-between" key={user._id}>
                                <div>
                                    <div className='container-fluid fs-5 fw-bold'>Name: <span className='text-muted'>{user.fullName}</span></div>
                                    <div className='container-fluid fs-5 fw-bold'>Email: <span className='text-muted'>{user.email}</span></div>
                                </div>
                                <button className='btn btn-danger px-4 ' onClick={() => handleDelete(user._id)}><i className="fa fa-solid fa-x"></i></button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
        </div>
    </>)
}

export default ManageUsers