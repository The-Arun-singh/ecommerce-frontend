import React, { useEffect, useState } from 'react'
import ProductsSection from '../../components/ProductsSection'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'



// this component renders the page to display all the products
const AllProducts = () => {
    const [products, setProducts] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const fetchproducts = async () => {
        try {
            await fetch(`http://localhost:8000/allproducts`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => res.json()).then(data => {
                if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                } else {
                    setProducts(data.products);
                    console.log(data);
                }
            });

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchproducts();
    }, []);

    return (<>
        <ProductsSection catagory={`ALL PRODUCTS`} products={products} />
    </>)
}

export default AllProducts