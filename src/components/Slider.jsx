import React from 'react'
import { kidImg, menImg, womenImg } from '../assets'



// This is Slider Component
// the code i used is the code from the capStone project from frontend module
// here i used bootstrap classes for styling most of the parts of the component
// here for the slider i used bootstrap carousel component
// and imported the required images from the assets/index.js    
const Slider = () => {
    return (<>
        {/* <!-- Featured product section  --> */}
        <div className="m-0">
            <div className="contaier-fluid bg-dark my-5 mx-1 rounded">
                <h2 className="text-center text-white p-3 fw-bold">Featured Products</h2>
                {/* <!-- using carousel bootstrap class to make the slide effect to demonstrate the products. --> */}
                <div id="carousel" className="carousel slide">
                    <div className="carousel-inner w-75 m-auto">
                        {/* <!-- active class depicts the active slide of the carousel --> */}
                        <div className="carousel-item active">
                            {/* <!-- using the grid layout of rows and columns for each slide in carousel --> */}
                            <div className="row mx-0 pb-5">
                                {womenImg.map((image, i) => {
                                    // console.log(i)
                                    return (
                                        <div className="col" key={i}>
                                            {/* <!-- using card bootstrap class for each products display  --> */}
                                            <div className="card">
                                                {/* <!-- product image  --> */}
                                                <img src={image.src}
                                                    alt="Orange dress for women" className="card-img-top" />
                                                <div className="card-body text-center">
                                                    <p className="card-title fw-bold fs-4 m-0">{image.title}</p>
                                                    <p className="cart-text fw-bold">{image.price}</p>
                                                    <p className="cart-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                        elit. A, dolorum!</p>
                                                    {/* <!-- cta button  --> */}
                                                    <button type="button" className="btn btn-warning"><i
                                                        className="cart fa fa-shopping-cart pe-1"></i>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* <!-- using the breakpoints of the bootstrap layout for the layout responsiveness --> */}
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="row mx-0 pb-5 mw-100">
                                {menImg.map((image, i) => {
                                    return (
                                        <div className="col" key={i}>
                                            {/* <!-- using card bootstrap class for each products display  --> */}
                                            <div className="card">
                                                {/* <!-- product image  --> */}
                                                <img src={image.src}
                                                    alt="Orange dress for women" className="card-img-top" />
                                                <div className="card-body text-center">
                                                    <p className="card-title fw-bold fs-4 m-0">{image.title}</p>
                                                    <p className="cart-text fw-bold">{image.price}</p>
                                                    <p className="cart-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                        elit. A, dolorum!</p>
                                                    {/* <!-- cta button  --> */}
                                                    <button type="button" className="btn btn-warning"><i
                                                        className="cart fa fa-shopping-cart pe-1"></i>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                        <div className="carousel-item">
                            <div className="row mx-0 pb-5">
                                {kidImg.map((image, i) => {
                                    return (
                                        <div className="col" key={i}>
                                            {/* <!-- using card bootstrap class for each products display  --> */}
                                            <div className="card">
                                                {/* <!-- product image  --> */}
                                                <img src={image.src}
                                                    alt="Orange dress for women" className="card-img-top" />
                                                <div className="card-body text-center">
                                                    <p className="card-title fw-bold fs-4 m-0">{image.title}</p>
                                                    <p className="cart-text fw-bold">{image.price}</p>
                                                    <p className="cart-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                        elit. A, dolorum!</p>
                                                    {/* <!-- cta button  --> */}
                                                    <button type="button" className="btn btn-warning"><i
                                                        className="cart fa fa-shopping-cart pe-1"></i>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev mb-4" type="button" data-bs-target="#carousel"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next mb-4" type="button" data-bs-target="#carousel"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Slider