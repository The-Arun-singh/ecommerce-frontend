import React, { useState } from 'react'
import '../styles/CreateProduct.css'
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();

    const [productData, setProductData] = useState({
        productName: "",
        category: {
            for: "",
            type: "",
        },
        description: "",
        price: 0,
        stockStatus: 0,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const editProduct = async (id, productData) => {
        // e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/editproduct/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(productData)
            });
            setLoading(false);
            // console.log(res.ok)
            if (res && res.ok) {
                navigate('/manageproducts');
            }
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/manageproducts');
        }
    }

    return (
        <>
            {loading ? (<>
                <div className="row">
                    <div className="col-md-12 mt-2">
                        <div className="spinner-border text-primary" role='status'>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>) : (<>
                <div className='my-5 container'>
                    <div className='text-start d-flex justify-content-between'>
                        <h1 className="fs-2 my-3  ms-4 fw-bold" id="editProduct">Edit Product</h1>
                        <span className='me-4 my-3 fs-5 fw-semibold btn' onClick={() => navigate('/manageproducts')}>Back</span>
                    </div>

                    <div className=" justify-content-between p-4 w-100">
                        <div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingInput" placeholder="Product Name" onChange={e => setProductData({ ...productData, productName: e.target.value })} required />
                                <label htmlFor="floatingInput">Product Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={e => setProductData({ ...productData, description: e.target.value })} required></textarea>
                                <label htmlFor="floatingTextarea">Product Description</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingInput" placeholder="Price" onChange={e => setProductData({ ...productData, price: parseFloat(e.target.value) })} required />
                                <label htmlFor="floatingInput">Price</label>
                            </div>
                            <div className='d-flex gap-2 mt-3'>
                                <div className="form-floating mb-2">
                                    <div>
                                        <select
                                            className="form-select form-select-sm mb-2"
                                            value={productData.category.for}
                                            onChange={e => setProductData({ ...productData, category: { ...productData.category, for: e.target.value } })}
                                            placeholder={'for :'}
                                            required
                                        >
                                            <option defaultValue={'Men'}>Men</option>
                                            <option defaultValue={'Women'}>Women</option>
                                            <option defaultValue={'Kid'}>Kid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-floating mb-2">

                                    {productData.category.for === "Men" ? (<>
                                        <div>
                                            <select
                                                className="form-select form-select-sm mb-2"
                                                value={productData.category.type}
                                                onChange={e => setProductData({ ...productData, category: { ...productData.category, type: e.target.value } })}
                                                placeholder={'Type :'}
                                                required
                                            >

                                                <option defaultValue={'shirts'}>shirts</option>
                                                <option defaultValue={'pants'}>pants</option>
                                                <option defaultValue={'hoodies'}>hoodies</option>
                                            </select>
                                        </div>
                                    </>) : productData.category.for === "Women" ? (<>
                                        <div>
                                            <select
                                                className="form-select form-select-sm mb-2"
                                                value={productData.category.type}
                                                onChange={e => setProductData({ ...productData, category: { ...productData.category, type: e.target.value } })}
                                                placeholder={'Women'}
                                                required
                                            >
                                                <option defaultValue={'dresses'}>dresses</option>
                                                <option defaultValue={'pants'}>pants</option>
                                                <option defaultValue={'skirts'}>skirts</option>
                                            </select>
                                        </div>
                                    </>) : (<>

                                    </>)}
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingInput" placeholder="stock Status" onChange={e => setProductData({ ...productData, stockStatus: parseInt(e.target.value) })} required />
                                <label htmlFor="floatingInput">Stock(in num)</label>
                            </div>
                        </div>
                        <div>
                            <button
                                className='btn btn-danger p-2 px-5 mt-4  '
                                onClick={() => editProduct(id, productData)}
                            // data-bs-dismiss="modal" 
                            >
                                Edit Product
                            </button>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default EditProduct