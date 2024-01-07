import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Rating = ({ max = 5, productId }) => {
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProduct = async (id) => {
        try {
            await fetch(`http://localhost:8000/getproduct/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }).then(res => res.json()).then(data => {
                if (data) {
                    // console.log("rating", data.product.rating.length);
                    const len = data.product.rating.length;
                    if (len > 0) {
                        const numberOfItems = data.product.rating.length;
                        const total = data.product.rating.reduce((acc, cur) => acc + cur.value, 0);
                        const finalRating = Math.round((total / numberOfItems) * 2) / 2;
                        setRating(finalRating);
                    }
                    // console.log(data)
                } else if (data.error === "jwt expired") {
                    console.log(data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);


    const filledStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = max - filledStars - halfStars;


    return (<>
        <div className='my-2'>
            {Array(filledStars).fill().map((_, i) => (
                <i className="fa-solid fa-star" key={i}></i>
            ))}
            {Array(halfStars).fill().map((_, i) => (
                <i className="fa-regular fa-star-half-stroke" key={i}></i>
            ))}
            {Array(emptyStars).fill().map((_, i) => (
                <i className="fa-regular  fa-star" key={i}></i>
            ))}
        </div>
    </>)
}

export default Rating
