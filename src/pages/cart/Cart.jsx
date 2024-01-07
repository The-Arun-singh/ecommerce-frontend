import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { decrementQuantity, incrementQuantity, removeItem } from '../../redux/reducers/cartSlice';




// this component implements the cart display and related functionality
const Cart = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    console.log(cart)

    const shippingPrice = cart.cart.length !== 0 ? 5 : 0;

    return (<>
        <main id="main" >
            <div className="container my-5">
                <h1 className='text-start mb-3'>Shopping Cart</h1>
                <div className=" p-2 m-auto d-flex gap-4">
                    <div className="col-sm-8  d-flex flex-column gap-3">
                        {cart && cart.cart.map(item => (
                            <div className="shadow rounded text-center">
                                <div className="row p-3  align-items-center">
                                    <div className="col-4 d-flex align-items-center">
                                        <img src={item.img} className="img-fluid rounded-start" alt={item.name} width={'30%'} />
                                        <p className="card-text ms-2 fs-4 fw-bold">{item.name}</p>
                                    </div>
                                    <div className="col-8">
                                        <div className=" d-flex justify-content-evenly align-items-center">
                                            <div className=" d-flex align-items-center">
                                                <p className="fw-semibold pe-3 fs-5 pt-3">${item.price}</p>
                                                <a href="#" type="button" className="btn btn-warning ms-3" onClick={() => dispatch(removeItem(item))}><i className="fa-solid fa-trash"></i></a>
                                            </div>
                                            <div>
                                                <form className="d-flex gap-1 flex-column flex-lg-row">
                                                    <a href="#" type="button" className="btn btn-warning" onClick={() => dispatch(decrementQuantity(item))}>
                                                        <i className="fa fa-solid fa-minus"></i>
                                                    </a>
                                                    <input type="number" className="form-control" name="quantity" id="quantity" placeholder={item.quantity} />
                                                    <a href="#" type="button" className="btn btn-warning" onClick={() => dispatch(incrementQuantity(item))}>
                                                        <i className="fa fa-solid fa-plus"></i>
                                                    </a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <!-- summary of the item costs in the cart  --> */}
                    <div className="col-sm-4">
                        <div className="card text-center">
                            <div className="card-header fs-5 fw-bold">Summary</div>
                            <div className="card-body m-2">
                                <div className="d-flex justify-content-between align-items-center px-2">
                                    <p className="card-text">Cost</p>
                                    <p className="card-text">${cart.totalPrice}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center px-2">
                                    <p className="card-text">Shipping</p>
                                    <p className="card-text">${shippingPrice}</p>
                                </div>
                                <hr className="" />
                                <div className="d-flex justify-content-between align-items-center px-2">
                                    <p className="card-text fw-semibold">Total</p>
                                    <p className="card-text fw-semibold">${cart.totalPrice + shippingPrice}</p>
                                </div>
                                {/* <!-- Checkout button  --> */}
                                <NavLink to={'/Shipping'} className="btn btn-warning mt-2" type="button" >Proceed to Checkout</NavLink>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Cart