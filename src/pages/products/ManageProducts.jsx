import React, { useEffect, useState } from 'react'
import ManageProductCard from '../../components/ManageProductCard'
import CreateProduct from '../../components/CreateProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



// this component renders the page to display all the products to be managed by the admin
const ManageProducts = () => {

    // fetch all products and map them

    const [allProducts, setAllProducts] = useState([]);

    // const user = useSelector(state => state.userReducer.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const res = await fetch("http://localhost:8000/allproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            const data = await res.json();
            if (res && res.ok) {
                setAllProducts(data.products);
                // console.log(data, data.myposts, allProducts);
            } else if (data.error === "jwt expired") {
                console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])

    return (<>
        <div>
            <main id="main" className="p-1">
                <div className="container-fluid m-0 bg-dark rounded ">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-center text-white py-2">Manage Products</h1>
                        </div>
                        <div className="my-5">
                            <button className='p-2 btn btn-light border border-2' data-bs-toggle="modal" data-bs-target="#createProduct">Create Product</button>
                            <CreateProduct getAllProducts={getAllProducts} />
                        </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center justify-content-center mx-0 pb-5">
                        {/* {Array(6).fill().map((_, i) => <ManageProductCard key={i} catagory={"Manage Products"} />)} */}
                        {allProducts.map(product => <ManageProductCard product={product} key={product._id} getAllProducts={getAllProducts} />)}
                    </div>
                </div>
            </main>
        </div>
    </>)
}

export default ManageProducts