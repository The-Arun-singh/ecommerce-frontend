import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SellerCard from '../../components/SellerCard'
import Rating from '../../components/Rating';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



// this component renders the page to display the product and lets user to rate and leave a review on it.
const Product = () => {
    const productId = useParams().id;

    const [product, setProduct] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [commentsArr, setCommentsArr] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(rating);


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
                    // console.log(data.product);
                    setProduct(data.product);
                    setCommentsArr(data.product.comments);
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
            toast.error(error.message);
        }
    }
    const saveRating = async (id, rating) => {
        try {
            await fetch(`http://localhost:8000/rating/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ rating: parseInt(rating) })
            }).then(res => res.json())
                .then(data => {
                    // console.log(data.product.rating);
                    toast.success(data.message);
                });
            fetchProduct(productId)

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const saveComment = async (id, comment) => {
        try {
            await fetch(`http://localhost:8000/comment/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ comment: comment })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success(data.message)
                })
            fetchProduct(productId)

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const handleSubmit = (e, id) => {
        e.preventDefault();

        if (rating && comment) {
            saveRating(id, rating);
            saveComment(id, comment);

            fetchProduct(productId);
        } else if (rating) {
            saveRating(id, rating);

            fetchProduct(productId);
        } else if (comment) {
            saveComment(id, comment);

            fetchProduct(productId);
        } else {
            alert('Please enter a comment or rating to save a review');
        }

        e.target.reset();
    };


    useEffect(() => {
        fetchProduct(productId);
    }, []);



    return (<>
        <div className="container-fluid align-items-center w-75 my-3">
            <div className="row">
                <div className="col-md-5">
                    <img src={product.productImg} alt={product.description} className='img-fluid rounded' />
                </div>
                <div className="col-md-3 mt-3">
                    <div>
                        <h1 className='mb-3'>{product.productName}</h1>
                        <hr className='w-50 mx-auto my-1' />
                        <Rating productId={productId} />
                        <hr className='w-50 mx-auto my-1' />
                        <p className='m-0'><span className='fw-semibold'>Price:</span> ${product.price}</p>
                        <hr className='w-50 mx-auto my-1' />
                        <p className='m-0 w-50 mx-auto'><span className='fw-semibold'>Description:</span> {product.description}</p>
                    </div>
                </div>
                <div className="col-md-4 mx-auto">
                    <SellerCard product={product} productId={productId} />
                </div>
            </div>
            <div className="text-start">
                <div className="row my-3 ">
                    <h2>Reviews</h2>
                    <Rating productId={productId} />
                    <div>
                        {commentsArr.length > 0 ? (<>
                            {
                                commentsArr.map(comment => {
                                    return (
                                        <div className="alert alert-light" role='alert' key={product.comments._id}>
                                            {comment.commentText}
                                        </div>
                                    )
                                })
                            }
                        </>) : (<>
                            <div className="alert alert-info" role="alert">
                                There is no review
                            </div>
                        </>)}
                    </div>
                </div>
                <div className="row my-3 ">
                    <h2 className='mb-3'>Write a Customer Review</h2>
                    <form onSubmit={(e) => handleSubmit(e, productId)}>
                        <div>
                            <select
                                className="form-select form-select-sm mb-2"
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                placeholder={'rate this product'}
                                required
                            >
                                <option selected>select a rating </option>
                                <option defaultValue={1}>1</option>
                                <option defaultValue={2}>2</option>
                                <option defaultValue={3}>3</option>
                                <option defaultValue={4}>4</option>
                                <option defaultValue={5}>5</option>
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Comments" onChange={e => setComment(e.target.value)} required />
                            <label htmlFor="floatingInput" className='ms-3'>Comments</label>
                        </div>
                        <button type='submit' className='btn btn-warning'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}

export default Product