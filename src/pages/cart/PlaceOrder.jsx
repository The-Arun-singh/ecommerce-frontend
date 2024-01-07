import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { emptyCart } from '../../redux/reducers/cartSlice';
import { toast } from 'react-toastify';



// this component implements the  functionality of placing the order i.e  only by placing the order is the order stored in the database and processed
const PlaceOrder = () => {
    const [payment, setPayment] = useState(Boolean);

    const shippingPrice = payment === 'true' ? 5 : 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);

    const { paymentmethod } = useParams();
    console.log(cart);

    const createOrder = async (e, cart) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8000/createorder', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(cart),
            }).then((res) => {
                console.log(res);
                if (res.ok) return res.json();
                const json = res.json();
                return Promise.reject(json);
            }).then(data => {
                if (data.message === 'Order created successfully') {
                    console.log(data);
                    dispatch(emptyCart())
                }
                toast.success('Order created successfully');
                navigate('/order/' + data.order._id);

            }).catch(e => {
                console.error(e.error);
                toast.error(e.message);
            })

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };


    useEffect(() => {
        if (paymentmethod === 'false') {
            setPayment(false);
        } else if (paymentmethod === 'true') {
            setPayment(true);
        }
    }, [])

    return (<>
        <div>
            <div className="mx-5">
                <div className="row text-start">
                    <div className="col-3 p-0">
                        <p className='mb-0 mt-3 fw-bold text-warning p-0 '>Sign-In</p>
                        <hr className='border-warning border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={"/shipping"} className='nav-link mb-0 mt-3 fw-bold text-warning p-0 '>Shipping</NavLink>
                        <hr className='border-warning border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={"/payment"} className='nav-link mb-0 mt-3 fw-bold text-warning p-0 '>Payment</NavLink>
                        <hr className='border-warning border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={`/placeorder/${payment}`} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Place Order</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                </div>
                <div className="container mx-auto mt-4 text-start">
                    <h1 className='mb-3'>Preview Order</h1>
                    <div className='d-flex justify-content-between'>
                        <div className='me-4'>
                            <div className='shadow-sm rounded p-3 mb-3'>
                                <h4 className='fw-bold'>Shipping</h4>
                                {user ? (<>
                                    <p className='m-0'><span className='fw-semibold'>Name :
                                        <span className='fw-bold'> {user.address.fullName || ''}</span>
                                        <p className='m-0'>
                                            <span className='fw-semibold'>
                                                Address :
                                                <span className='fw-bold'> {user.address.userAddress || ''}</span>
                                            </span>
                                        </p>
                                    </span></p>
                                </>) : (<>
                                </>)}
                                <div className="my-2">
                                    <NavLink to={'/shipping'}>Edit</NavLink>
                                </div>
                            </div>
                            <div className='shadow-sm rounded p-3 mb-3'>
                                <h4 className='fw-bold'>Payment</h4>
                                <p className='m-0'><span className='fw-bold'>
                                    Method :
                                    {payment ? (<span className='text-warning'> CASH ON DELIVERY</span>) : (<span className='text-muted fw-semibold'> Please select payment method</span>)}
                                </span></p>
                                <div className="my-2">
                                    <NavLink to={'/payment'} >Edit</NavLink>
                                </div>
                            </div>
                            <div className='shadow-sm rounded p-3 mb-3'>
                                <h4 className='fw-bold'>Items</h4>
                                {cart.cart.map(item => {
                                    return (<>
                                        <div className='d-flex justify-content-between align-items-center my-2'>
                                            <img src={item.img} alt="" className="img-fluid" width={'10%'} />
                                            <div className="my-2">
                                                <NavLink to={`/product/${item.id}`} className='nav-link'>{item.name}</NavLink>
                                            </div>
                                            <p className='m-0'>{item.quantity}</p>
                                            <p className='m-0'>${item.price}</p>
                                        </div>
                                    </>)
                                })}
                            </div>
                        </div>
                        <div>
                            <div className='shadow-sm rounded px-4 py-2'>
                                <h4 className="fw-bold mb-3">Order Summary</h4>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>Items Price: </div>
                                    <div>${cart.totalPrice}</div>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <div>Shipping</div>
                                    <div>${shippingPrice}</div>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <div>Tax (18%):</div>
                                    <div>${cart.totalPrice * 0.18}</div>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <div className='fw-bold'>Order Total</div>
                                    <div className='fw-bold'>${cart.totalPrice + shippingPrice + (cart.totalPrice * 0.18)}</div>
                                </div>
                                <hr />
                                <div className='d-grid'>
                                    {payment ? (<>
                                        <button className='btn btn-warning' onClick={(e) => createOrder(e, cart)}> checkOut</button>
                                    </>) : (<>
                                        <button className='btn btn-warning' onClick={() => navigate('/payment')}> select payment </button>
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
            </div>
        </div>
    </>)
}

export default PlaceOrder