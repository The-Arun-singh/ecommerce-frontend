import React from 'react'
import { homeImg } from '../assets'

const ContactUs = () => {
    return (<>
        <main id="main" className="p-3">
            <div className="container-fluid m-0 ">
                <h1 className="text-center pb-2 fw-bold">Contact Us</h1>
                <div className="d-flex align-items-center flex-column flex-sm-row my-5">
                    <div className="m-3 " >
                        <img src={homeImg.contactUs} alt="contact us image" className="img-fluid w-50 rounded" />
                    </div>
                    <div className="m-3 text-start " >
                        {/* <!-- form tag for the contact us input fields  --> */}
                        <form>
                            <div className="d-grid">
                                <label className="form-label pt-2 m-0 fs-5" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your Name" autocomplete="name" required />
                            </div>
                            <div className="d-grid">
                                <label className="form-label pt-2 m-0 fs-5" htmlFor="email">E-mail</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your E-mail" autocomplete="email" required />
                            </div>
                            <div className="d-grid">
                                {/* <!-- using textarea tag for the messages --> */}
                                <label className="form-label pt-2 m-0 fs-5" htmlFor="message">Message</label>
                                <textarea name="message" className="form-control" placeholder="Enter your message" id="message"
                                    cols="30" rows="3" required></textarea>
                            </div>
                            <div className="d-grid py-2">
                                <button type="button" className="btn btn-warning text-center fw-semibold fs-5">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main >
    </>)
}

export default ContactUs