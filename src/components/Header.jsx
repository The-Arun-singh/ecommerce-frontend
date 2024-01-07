import React from 'react'
import { homeImg } from '../assets'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/HeaderFooter.css'
import { useDispatch, useSelector } from 'react-redux'

// This is Header 
// the code i used is the code from the capStone project from frontend module
// here i used bootstrap classes for styling most of the parts of the component
// the link are mostly routing to the '/' path
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = useSelector(state => state.auth.user);
    const cart = useSelector(state => state.cart.cart);
    // console.log(user)


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    return (<>
        <header className="justify-content-center align-items-center">
            <div className=" bg-dark d-flex align-items-center px-2 p-2">

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center align-items-start w-100">
                    <div style={{ width: '13rem' }}>
                        <NavLink to={"/"} >
                            <img src={homeImg.logo} alt="" className="img-fluid rounded w-100" />
                        </NavLink>
                    </div>
                    <div className="p-1 py-2 ms-5">
                        <div className="input-group">
                            <input type="text" name="search" className="form-control" />
                            <button type="button" className="input-group-text btn fs-5 btn-warning">Search</button>
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="d-flex align-items-center flex-column flex-sm-row">
                            {token ? (<>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown">
                                        <div className=' d-flex align-items-center justify-content-center'
                                            data-bs-toggle="dropdown">
                                            <span className='text-light fs-5'>
                                                Welcome {user.fullName}
                                            </span>
                                        </div>
                                        <ul className="dropdown-menu dropdown-menu-start mt-2">
                                            <li className='dropdown-item ps-2 py-2'>
                                                <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/myprofile'}>User Profile</NavLink>
                                            </li>
                                            <li className='dropdown-item ps-2 py-2'>
                                                <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/orderhistory'}>Order History</NavLink>
                                            </li>
                                            <hr className='m-0' />
                                            <li className='dropdown-item fw-semibold ps-2 py-2'>
                                                <p onClick={logout} className='m-0 logout'>SignOut</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown ms-3">
                                        <div className='d-flex align-items-center justify-content-center btn btn-warning dropdown-toggle'
                                            data-bs-toggle="dropdown">
                                            <span className='fs-5'>
                                                admin
                                            </span>
                                        </div>
                                        <ul className="dropdown-menu dropdown-menu-start mt-2">
                                            <li className='dropdown-item ps-2 py-2'>
                                                <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/manageusers'}>Manage Users</NavLink>
                                            </li>
                                            <li className='dropdown-item ps-2 py-2'>
                                                <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/manageproducts'}>Manage Products</NavLink>
                                            </li>
                                            <li className='dropdown-item ps-2 py-2'>
                                                <NavLink className="nav-link text-dark fs-6 fw-semibold" to={'/manageorders'}>Manage Orders</NavLink>
                                            </li>
                                            <hr className='m-0' />
                                            <li className='dropdown-item fw-semibold ps-2 py-2'>
                                                <p onClick={logout} className='m-0 logout'>SignOut</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <NavLink className="nav-link text-warning px-3 pt-sm-3 pt-sm-0" to={"/cart"} >
                                        <i className="position-relative cart fa fa-shopping-cart fa-2x">
                                            <span className="position-absolute top-0 start-100 translate-middle badge text-bg-danger rounded-circle fs-6">{cart.length}</span>
                                        </i>
                                    </NavLink>
                                </div>
                            </>) : (<>

                                <div className="d-flex align-items-center">
                                    <NavLink to={"/login"} >
                                        <button type="button" className="btn fs-5 btn-warning px-2">Login</button>
                                    </NavLink>
                                    <NavLink className="nav-link text-warning px-3 pt-sm-3 pt-sm-0" to={"/cart"} >
                                        <i className="cart fa fa-shopping-cart fa-2x">
                                            <span className="badge translate-middle fs-6 bg-danger rounded-circle ">1
                                                {/* cart quantity  */}
                                            </span></i>
                                    </NavLink>
                                </div>
                            </>)}
                        </div>
                    </div>
                </div >

                <button className="navbar-toggler btn fs-5 btn-light d-sm-none border p-1 m-2 rounded bg-dark-subtle" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa bars fa-solid fa-bars fa-2x px-1"></i>
                </button>
            </div >
            <nav className="navbar navbar-expand-sm justify-content-center align-items-center bg-dark-subtle p-0 pt-2"
                id="collapseNav">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">
                        <ul className="d-flex list-unstyled flex-sm-row flex-column">
                            <li>
                                <NavLink to={"/"} className="nav-link px-2 fw-semibold fs-5">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/allproducts"} className="nav-link px-2 fw-semibold fs-5">All Products</NavLink>
                            </li>
                            <li className="dropdown">
                                <NavLink type="button" className="nav-link px-2 fw-semibold fs-5 dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false">Women</NavLink>
                                <ul className="dropdown-menu mt-2">
                                    <li><NavLink to={"/products/women"} className="dropdown-item fs-5">All Products</NavLink></li>
                                    <li><NavLink to={"/products/women/dresses"} className="dropdown-item fs-5">Dresses</NavLink></li>
                                    <li><NavLink to={"/products/women/pants"} className="dropdown-item fs-5">Pants</NavLink></li>
                                    <li><NavLink to={"/products/women/skirts"} className="dropdown-item fs-5">Skirts</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={"/products/kid"} className="nav-link px-2 fw-semibold fs-5">Kids</NavLink>
                            </li>
                            <li className="dropdown">
                                <NavLink to={"#"} className="nav-link px-2 fw-semibold fs-5 dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">Men</NavLink>
                                <ul className="dropdown-menu mt-2">
                                    <li><NavLink to={"/products/men"} className="dropdown-item fs-5">All Products</NavLink></li>
                                    <li><NavLink to={"/products/men/shirts"} className="dropdown-item fs-5">Shirts</NavLink></li>
                                    <li><NavLink to={"/products/men/pants"} className="dropdown-item fs-5">Pants</NavLink></li>
                                    <li><NavLink to={"/products/men/hoodies"} className="dropdown-item fs-5">Hoodies</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={"/contactus"} className="nav-link px-2 fw-semibold fs-5">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    </>)
}

export default Header