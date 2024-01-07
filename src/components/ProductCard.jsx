import React from 'react'
import '../styles/ProductCard.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (id) => {
        navigate(`/product/${id}`);
    }

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart({ id: product._id, name: product.productName, price: product.price, img: product.productImg }))
        navigate(`/cart`);
    };


    return (<>
        <div className="m-2">
            <div className="card">
                <img src={product.productImg} alt={product.description} className="card-img-top" onClick={() => handleNavigate(product._id)} />
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold fs-4 " onClick={() => handleNavigate(product._id)}>{product.productName}</h5>
                    <p className="cart-text fw-semibold fs-5 fw-semibold">${product.price}</p>
                    <p className="cart-text text-muted ">{product.description} </p>
                    <button type="button" className="btn btn-warning" onClick={e => handleAddToCart(e, product)}><i className="cart fa fa-shopping-cart pe-1"></i>Add to
                        Cart</button>
                </div>
            </div>
        </div>
    </>)
}

export default ProductCard 