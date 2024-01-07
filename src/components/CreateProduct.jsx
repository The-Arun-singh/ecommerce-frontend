import React, { useState } from 'react'
import '../styles/CreateProduct.css'
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ getAllProducts }) => {
    const [image, setImage] = useState({
        preview: "",
        data: "",
    })
    const [productData, setProductData] = useState({
        productName: "",
        category: {
            for: "",
            type: "",
        },
        description: "",
        price: 0,
        stock: 0,
    });
    console.log(productData.category)

    const [loading, setLoading] = useState(false);


    const handleFileSelect = (e) => {
        const img = {
            preview: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "",
            data: e.target.files[0]
        }
        setImage(img)
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);
        try {
            const res = await fetch("http://localhost:8000/uploadfile", {
                method: "POST",
                body: formData
            });
            const jsonRes = await res.json();
            return jsonRes;
        } catch (error) {
            // console.error("Error uploading file: ", error);
            throw error;
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const imgRes = await handleImgUpload();
        // console.log(imgRes, imgRes.fileName);
        const req = {
            ...productData,
            image: `http://localhost:8000/files/${imgRes.fileName}`
        };
        try {
            const res = await fetch("http://localhost:8000/createproduct", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(req)
            })
            setLoading(false);
            // console.log(res.ok)
            if (res && res.ok) {
                getAllProducts();
            }
        } catch (error) {
            console.log(error);
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
                <div className="modal fade" id="createProduct" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div>
                                    <div className='d-flex justify-content-between'>
                                        <h1 className="modal-title fs-5" id="uploadpost">Create Product</h1>
                                        <i className="btn fa-solid fa-xmark" data-bs-dismiss="modal"></i>
                                    </div>
                                    <div className="d-flex flex-sm-row flex-column">
                                        <div className="upload w-100 p-sm-4 p-3 my-3 my-sm-0 mt-4 mt-sm-0">
                                            <div className='uploadOverlay d-flex flex-column align-items-center justify-content-center px-5 py-4 m-sm-0 ms-4'>
                                                {image.preview ? (<>
                                                    <img src={image.preview} alt="preview" className='rounded' width='100%' height="100%" />
                                                </>) : (<>
                                                    <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                                                    <div>Upload from your Computer</div>
                                                </>)}
                                            </div>
                                            <input type="file" name="uploadfile" className='uploadfile' accept='.jpg, .png, .gif' onChange={e => handleFileSelect(e)} required />
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
                                                <div className='d-flex gap-2'>
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
                                                    <input type="text" className="form-control" id="floatingInput" placeholder="stock Status" onChange={e => setProductData({ ...productData, stock: parseInt(e.target.value) })} required />
                                                    <label htmlFor="floatingInput">Stock(in num)</label>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-danger p-2 px-5 float-end mt-5' onClick={e => addProduct(e)} data-bs-dismiss="modal" >Create Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default CreateProduct