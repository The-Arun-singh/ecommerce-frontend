import React from 'react'
import '../styles/HomeCover.css'

// This is HomeCover Component
// the code i used is the code from the capStone project from frontend module
// here i used bootstrap classes for styling most of the parts of the component
const HomeCover = () => {
    return (<>
        <div className=" text-center bg-image homeCover">
            <div className="mask w-100 h-100 m-0 hero">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-warning">
                        <h1 className="mb-3 display-1 fw-bold">DigiBazaar</h1>
                        <h4 className="mb-3">Clothes that talk on behalf of you. Something for every occassion.</h4>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default HomeCover