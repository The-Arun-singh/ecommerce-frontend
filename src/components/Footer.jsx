// footer component

import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/HeaderFooter.css'

// This is Footer Component
// the code i used is the code from the capStone project from frontend module
// here i used bootstrap classes for styling most of the parts of the component
// the link are mostly routing to the '/' path
const Footer = () => {
    return (<>
        <footer className=" bg-dark text-white m-0 mt-5 mb-0 pt-3 fs-5">
            <div className="container-fluid p-0">
                <div
                    className="row flex-column flex-sm-row justify-content-around text-center align-items-center align-items-sm-start p-3 m-0">
                    <ul className="col-2 list-unstyled align-items-center">
                        <li>
                            <h4><NavLink className="nav-link" to={'/womenallproducts'}>Women</NavLink></h4>
                        </li>
                        <li><NavLink className="nav-link" to={'/dresses'}>Dresses</NavLink></li>
                        <li><NavLink className="nav-link" to={'/womenpants'}>Pants</NavLink></li>
                        <li><NavLink className="nav-link" to={'/skirts'}>Skirts</NavLink></li>
                    </ul>
                    <ul className="col-2 list-unstyled align-items-center">
                        <li>
                            <h4><NavLink to={"/kids"} className="nav-link">Kids</NavLink></h4>
                        </li>
                    </ul>
                    <ul className="col-2 list-unstyled align-items-center">
                        <li>
                            <h4><NavLink className="nav-link" to={'/menallproducts'}>Men</NavLink></h4>
                        </li>
                        <li><NavLink className="nav-link" to={'/shirts'}>Shirts</NavLink></li>
                        <li><NavLink className="nav-link" to={'/menpants'}>Pants</NavLink></li>
                        <li><NavLink className="nav-link" to={'/hoodies'}>Hoodies</NavLink></li>
                    </ul>
                    <ul className="col-2 list-unstyled align-items-center">
                        <li>
                            <h4>Links</h4>
                        </li>
                        <li><NavLink className="nav-link" to={'/'}>Home</NavLink></li>
                        <li><NavLink className="nav-link" to={'/login'}>Login</NavLink></li>
                        <li><NavLink className="nav-link" to={'/contactus'}>Contact Us</NavLink></li>
                    </ul>
                </div>
                <hr className="m-auto mb-3 mx-5" />
                <p className="pb-4 text-center m-0">Copyright &copy;digiBazaar 2022-23</p>
            </div>
        </footer>
    </>)
}

export default Footer