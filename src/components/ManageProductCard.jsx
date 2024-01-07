import React, { useEffect, useState } from 'react'
import '../styles/ProductCard.css'
import { useNavigate } from 'react-router-dom'

const ManageProductCard = ({ product, getAllProducts }) => {
    const navigate = useNavigate();

    const handleEdit = async (id) => {
        navigate(`/editproduct/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/deleteproduct/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json()).then(data => console.log(data));
            getAllProducts();
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigate = (id) => {
        navigate(`/product/${id}`);
    }



    return (<>
        <div className="m-2">
            <div className="card">
                <img src={product.productImg} alt={product.productName} className="card-img-top" onClick={() => handleNavigate(product._id)} />
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold fs-4 " onClick={() => handleNavigate(product._id)}>{product.productName}</h5>
                    <p className="cart-text fw-semibold fs-5">${product.price}</p>
                    <p className="cart-text text-muted ">{product.description}</p>
                    <button
                        className='btn btn-warning me-1'
                        onClick={() => handleEdit(product._id)}
                    >
                        Edit
                    </button>
                    {/* <button type="button" className="btn btn-warning me-1"onClick={() => handleEdit(product._id)}>Edit</button> */}
                    <button type="button" className="btn btn-warning ms-1" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
            </div>
        </div>
    </>)
}

export default ManageProductCard