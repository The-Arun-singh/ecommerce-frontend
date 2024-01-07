import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



// this component implements the functionality to update user Address if not already have and if already have then you can skip to next step
const Shipping = () => {
    const [address, setAddress] = useState({
        fullName: '',
        userAddress: '',
        city: '',
        postalCode: 0,
        country: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const payment = false;

    const user = useSelector(state => state.auth.user);
    console.log(address, user.address);

    const userAddress = async (id, address) => {
        try {
            await fetch(`http://localhost:8000/updateuserdata/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ address })
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.message === 'address added') {
                    dispatch({ type: "UPDATE", payload: data.user })
                    navigate('/payment');
                } else if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleSkip = () => {
        navigate('/payment');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        userAddress(user.id, address);
    }


    return (<>
        <div className="">
            <div className='mx-5'>
                <div className="row text-start">
                    <div className="col-3 p-0">
                        <p className='mb-0 mt-3 fw-bold text-warning p-0 '>Sign-In</p>
                        <hr className='border-warning border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={"/shipping"} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Shipping</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={"/payment"} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Payment</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={`/placeorder/${payment}`} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Place Order</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                </div>
                <div className="w-50 mx-auto mt-4 text-start">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className='mb-3'>Shipping Address</h1>
                        {user.address.userAddress && (
                            <p className='nav-link mb-0 fw-bold text-danger p-0' onClick={handleSkip}>
                                Skip {'->'}
                            </p>
                        )}
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Full Name" onChange={e => setAddress({ ...address, fullName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="Address" placeholder="Address" onChange={e => setAddress({ ...address, userAddress: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="City" className="form-label">City</label>
                            <input type="text" className="form-control" id="City" placeholder="City" onChange={e => setAddress({ ...address, city: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="PostalCode" className="form-label">Postal Code</label>
                            <input type="text" className="form-control" id="PostalCode" placeholder="Postal Code" onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="Country" placeholder="Country" onChange={e => setAddress({ ...address, country: e.target.value })} />
                        </div>
                        <button className='btn btn-warning border border-dark' type='submit'>Continue</button>
                    </form>
                </div>
                <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
            </div>
        </div>
    </>)
}

export default Shipping