import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



// this component renders all the orders created by the user and lets them delete if they cancel their orders
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(orders)

    const fetchAllMyOrders = async () => {
        try {
            await fetch(`http://localhost:8000/getmyorders`, {
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
                    setOrders(data.myOrders);
                    console.log(data);
                }
            });

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllMyOrders();
    }, []);

    const handleDelete = async (id) => {
        console.log('hello');
        try {
            await fetch(`http://localhost:8000/deleteorder/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => response.json()).then(data => console.log(data));

            await fetchAllMyOrders();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='py-2 mx-5'>
            <h1 className='py-2 text-start'>Order History</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL QUANTITY</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    {orders.map((item, i) => {
                        return (<>
                            <tbody>
                                <tr onClick={() => navigate('/order/' + item._id)}>
                                    <td>{i + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.totalQuantity}</td>
                                    <td>${item.totalPrice}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.orderStatus}</td>
                                    <td>
                                        <button className='btn btn-danger px-1 py-0 ' onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </>)
                    })}
                </table>
                <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
            </div>
        </div>
    )
}

export default OrderHistory