import React from 'react'
import "./Payment.scss"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { resetCart } from "../../redux/slice/CartSlice";
import { useDispatch } from "react-redux";
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Payment = () => {
    const params = useParams();
    const searchQuery=useSearchParams()[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = params?.status;
    const referenceNumber=searchQuery.get("referenceNumber");

    const infoData = {
        success: {
            message: "Your Order is Successfull",
            cta: "Shop More",
            icon: <BsFillCartCheckFill />,
        },
        error: {
            message: "Your Payment is Failed",
            cta: "Please Try Again",
            icon: <BiErrorCircle />,
        },
    };

    if (status === 'success') {
        dispatch(resetCart())
    }

    return (
        <>
            <Navbar />
            <div className="payments">
                <div className="payments-icon" style={{ color: status === "error" ? "red" : "" }}>{infoData[status].icon}</div>
                <h2 className="message">{infoData[status]?.message}</h2>
                <h5>{`Order Reference Number is ${referenceNumber}`}</h5>
                
                <button className="btn btn-primary" onClick={() => { navigate("/") }}>{infoData[status].cta}</button>
            </div>
            <Footer />
        </>
    );
};


export default Payment