import React, { useState } from 'react'
import "./CartArea.scss"
import DeliveryBanner from '../delivery-banner/DeliveryBanner'
import Cart from '../cart-item/CartItem'
import CartItem from '../cart-item/CartItem'
import { BsFillHandbagFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../../redux/slice/CartSlice'
import { axiosClient } from '../../utils/AxiosClient'
import { loadStripe } from '@stripe/stripe-js';
import { Spin } from 'antd'

const CartArea = ({ cartData }) => {
    //const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state?.UserReducer?.userInfo);

    const cartLength = cartData?.length;
 
    let mrpTotal = 0;
    let saleTotal = 0;
    let handelingCharges = 0;
    let deliveryCharges = 0;

    for (let item in cartData) {
        mrpTotal += cartData[item].mrp * cartData[item].productQty
        saleTotal += cartData[item].price * cartData[item].productQty
    }

    let grossTotal = saleTotal + handelingCharges + deliveryCharges;
    let totalSaving = mrpTotal - saleTotal;
    let savingPercent = Math.round((totalSaving / mrpTotal) * 100);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const razorPayData = await axiosClient.get("/order/getRazorPayKey")
        const razorPayId = razorPayData?.data?.result?.razorPayKey;

        const actualOrderData = await axiosClient.post("/order/createOrder", {
            userId: userData?._id,
            userName: userData?.firstName + " " + userData?.lastName,
            grossTotal: grossTotal,
            products: cartData
        })

        const orderData = actualOrderData?.data?.result;

        const options = {
            key: razorPayId, // Enter the Key ID generated from the Dashboard
            amount: Number(grossTotal * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Tushar SuperMart",
            description: "Grocery Items Transaction",
            image: "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/402983990_896945812093686_2273992641898639599_n.jpg?ccb=11-4&oh=01_AdSCmKwNO04bqXFH27mVbBz1YroWdCNurmBkmY4F9m_nVA&oe=659A9F9C&_nc_sid=e6ed6c&_nc_cat=107",
            order_id: orderData.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${process.env.NODE_ENV =="production"?process.env.REACT_APP_SERVER_BASE_URL:process.env.REACT_APP_BASE_URL}/order/paymentVerification`,
            prefill: {
                "name": userData?.firstName + " " + userData?.lastName,
                "email": userData?.email,
                "contact": "9000090000"
            },
            notes: {
                "address": "Kharjai Naka,Tushar SuperMart"
            },
            theme: {
                "color": "#e09006"
            }
        };

        const razorPay = new window.Razorpay(options);
        setTimeout(() => {
            setLoading(false);
        }, 1000)

        razorPay.open();
    }

    return (
        <div className='cart-area'>
            <Spin spinning={loading} fullscreen={loading}>
                <h4><BsFillHandbagFill className='shopping-cart' />Shopping Cart ({cartData.length} Items)</h4>
                <div className='main-cart-area'>
                    <div className='section1'>
                        {cartData.map(item => (
                            <>
                                <CartItem data={item} />
                                <hr style={{ color: "rgba(43, 30, 53, 0.5)" }} />
                            </>
                        ))}
                    </div>
                    <div className='section2'>
                        <div className='charges-name'>
                            <p>Item Total</p>
                            <p style={{ color: "rgba(43,30,53,0.5)" }}>Handling Charge</p>
                            <p style={{ color: "rgba(43,30,53,0.5)" }}>Delivery Fee</p>
                            {/* <p>Taxable Bill</p> */}
                            <hr style={{ color: "rgba(43, 30, 53, 0.5)" }} />
                            <p><strong>Total Bill</strong></p>
                        </div>

                        <div className='charges-amt'>
                            <p><span className='max-charge'>₹{mrpTotal}</span>₹{saleTotal}</p>
                            <p style={{ color: "var(--primary-color)" }}><span className='max-charge'>₹{handelingCharges + 10}</span>₹{handelingCharges}</p>
                            <p style={{ color: "var(--primary-color)" }}><span className='max-charge'>₹{deliveryCharges + 10} </span>₹{deliveryCharges}</p>
                            <hr style={{ color: "rgba(43, 30, 53, 0.5)" }} />
                            <p><strong>₹{grossTotal}</strong></p>
                        </div>
                        <div className='payment-btn-section'>
                            <p style={{ color: "var(--primary-color)" }}><strong>Congratulations you have saved ₹{totalSaving} on your order.</strong></p>
                            <button className='payment-btn' onClick={handlePayment}>Continue to payment</button>
                        </div>

                    </div>
                    <div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default CartArea