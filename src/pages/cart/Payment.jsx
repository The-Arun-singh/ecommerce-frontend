import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'



// this component implements the payment method selection functionality at the moment i have only implemented the 'cash on delivery' method
const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState(false);

    const navigate = useNavigate();

    const handleSelectedPaymentMethod = (e, paymentMethod) => {
        e.preventDefault();

        navigate(`/placeorder/${paymentMethod}`)
    };

    console.log(paymentMethod)


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
                        <NavLink to={`/payment/${paymentMethod}`} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Payment</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                    <div className="col-3 p-0">
                        <NavLink to={`/placeorder/${paymentMethod}`} className='nav-link mb-0 mt-3 fw-bold text-muted p-0 '>Place Order</NavLink>
                        <hr className='border border-3 my-1' />
                    </div>
                </div>
                <div className="w-50 mx-auto mt-4 text-start">
                    <h1 className='mb-3'>Payment Method</h1>
                    <form >
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="payment" value='Cash_on_Delivery' id="Cash_on_Delivery" onClick={() => setPaymentMethod(true)} />
                            <label class="form-check-label" for="Cash_on_Delivery">
                                Cash on Delivery
                            </label>
                        </div>
                        {/* <div class="form-check my-2">
                            <input class="form-check-input" type="radio" value="strip" name='payment' id="strip" />
                            <label class="form-check-label" for="strip">
                                Stripe
                            </label>
                        </div> */}

                        <button type='button' className='btn btn-warning border border-dark' onClick={(e) => handleSelectedPaymentMethod(e, paymentMethod)}>Continue</button>
                    </form>
                </div>
                <p className='text-center fw-semibold mt-5'>All Rights Reserved</p>
            </div>
        </div>
    </>)
}

export default Payment



