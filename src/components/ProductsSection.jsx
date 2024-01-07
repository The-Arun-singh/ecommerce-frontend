import React from 'react'
import ProductCard from './ProductCard';

const ProductsSection = ({ catagory, products }) => {

    return (<>
        <main id="main" className="p-1">
            <div className="container-fluid m-0 bg-dark rounded ">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center text-white py-2">{catagory}</h1>
                    </div>
                </div>

                <div className="container d-flex flex-wrap align-items-center justify-content-center mx-auto pb-5">
                    {/* {Array(6).fill().map((_, i) => <ProductCard key={i} {...products} />)} */}

                    {products && products.map(product => <ProductCard product={product} key={product._id} />)}
                </div>
            </div>
        </main>
    </>)
}

export default ProductsSection