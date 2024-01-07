import React from 'react'
import Rating from './Rating'
import { NavLink } from 'react-router-dom'

const SellerCard = ({ product, productId }) => {
    console.log(product)
    const seller = 'seller';
    if (product.seller) {
        const seller = product.seller.sellerName;
    }
    return (<>
        <div className="container shadow rounded p-4 my-md-0 my-5">
            <h5 className='m-0 pb-2'>Seller</h5>
            <h2 className='mb-3'>{seller}</h2>
            <Rating productId={productId} />
            <hr className='w-75 mx-auto' />
            <p className='m-0 fw-semibold'> <span className='fw-bold'>Price:</span>${product.price}</p>
            <hr className='w-75 mx-auto' />
            <p className='m-0'><span className='fw-bold'>stock: </span>{product.stockStatus}</p>
            <hr className='w-75 mx-auto' />
            <NavLink to={'/shipping'}>
                <button className='btn btn-warning'>Add to Cart</button>
            </NavLink>
        </div>
    </>)
}

export default SellerCard 