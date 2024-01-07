import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



// this component renders the page to let the user update his/her data 
const MyProfile = () => {
    const [password, setPassword] = useState({ password: '' });
    const [sellerName, setSellerName] = useState({ sellerName: "" });
    const [user, setUser] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.auth.user);
    const id = userState.id;
    // console.log(id); 


    const fetchUser = async (id) => {
        try {
            await fetch(`http://localhost:8000/getuser/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => res.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setUser(data.user)
                    // console.log(data)
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
        toast.success("User Successfully logged out");
    }

    const updateUser = async (id, userData) => {
        try {
            await fetch(`http://localhost:8000/updateuserdata/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData)
            }).then(response => response.json())
                .then(data => toast.success(data.message));
            logout();

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }



    const updateUserData = (e, id, userData) => {
        e.preventDefault();
        updateUser(id, userData);
    }

    useEffect(() => {
        fetchUser(id);
    }, [])


    return (<>
        <div className="w-50 mx-auto my-4 text-start">

            <div>
                <h1 className='mb-3'>Welcome {user.fullName}</h1>
                <div className='d-flex justify-content-between'>
                    <span className='fs-4 fw-semibold'>FullName: {user.fullName}</span>
                    <span className='fs-4 fw-semibold'>Email: {user.email}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span className='fs-4 fw-semibold'>SellerName: {user.sellerName}</span>
                </div>
            </div>

            <form >
                <h2 className='my-5'>User Profile</h2>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="d-flex justify-content-between gap-2">
                        <input type="password" className="form-control" id="password" required onChange={(e) => setPassword({ password: e.target.value })} />
                        <NavLink to={"/login"} className='btn btn-warning border border-dark' onClick={(e) => updateUserData(e, id, password)}>Save</NavLink>
                    </div>
                </div>
                <h2 className='mt-5 mb-3'>Seller Profile</h2>
                <div className="mb-3">
                    <label htmlFor="sellername" className="form-label">Seller Name</label>

                    <div className="d-flex justify-content-between gap-2">
                        <input type="text" className="form-control" id="sellername" onChange={(e) => setSellerName({ sellerName: e.target.value })} />
                        <NavLink to={"/login"} className='btn btn-warning border border-dark' onClick={(e) => updateUserData(e, id, sellerName)}>Save</NavLink>
                    </div>
                </div>
            </form >
            <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
        </div >
    </>)
}

export default MyProfile;