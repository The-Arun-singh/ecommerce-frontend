import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';



// this component renders the order page displaying all the items in the order and their unit prices and quantity
const Order = () => {
    const [order, setOrder] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id, order);

    const fetchOrder = async (id) => {
        try {
            await fetch(`http://localhost:8000/getorder/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => res.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setOrder(data.order);
                    console.log(data);
                }
            });

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchOrder(id);
    }, [id]);

    return (
        <div className='my-4'>
            <h1 className='mb-4'>Order</h1>
            <div className='container'>
                <div className="d-flex justify-content-between align-items-center">

                    <h4 className='fw-semibold text-start'>Order id :<span>{order._id}</span></h4>
                    <h4 className='fw-semibold text-start'>Status :<span>{order.orderStatus}</span></h4>
                </div>
                <div>
                    <div className='shadow-sm rounded p-3 mb-3'>
                        <h3 className='fw-bold'>Items</h3>
                        {order.cart && order.cart.map(item => {
                            return (<>
                                <div className='d-flex justify-content-between align-items-center my-2 p-2'>
                                    <img src={item.id.productImg} alt="" className="img-fluid rounded" width={'10%'} />
                                    <div className="my-2 fw-bold">
                                        <NavLink to={`/product/${item.id}`} className='nav-link  rounded shadow-sm py-1 px-3'>{Boolean(item) && item.id.productName.toUpperCase()}</NavLink>
                                    </div>
                                    <p className='m-0 fw-bold rounded shadow-sm py-1 px-3'>Item Quantity : {item.quantity}</p>
                                    <p className='m-0 fw-bold rounded shadow-sm py-1 px-3'>Unit Price : ${item.id.price}</p>
                                </div>
                            </>)
                        })}
                    </div>
                </div>
                <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Order