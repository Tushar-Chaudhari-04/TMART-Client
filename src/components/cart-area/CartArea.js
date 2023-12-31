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

    //  const cartData = useSelector((state) => state?.CartReducer?.cart);
    const cartLength = cartData?.length;
    console.log("cartData", cartData, cartLength)
    //const [mrpTotal,setMrpTotal]=useState(0);
    // const cartData = [
    //     {
    //         id: 4,
    //         name: "iD Idli & Dosa Batter",
    //         qty: "1 kg",
    //         mrp: 85,
    //         price: 83,
    //         url: "https://cdn.zeptonow.com/production///tr:w-200,ar-900-706,pr-true,f-webp,q-80/cms/product_variant/1VuewNRkmd2vz9tyCybxdMvN0Xh200_WN.jpeg"
    //     },
    //     {
    //         id: 5,
    //         name: "Godrej Jersey Curd",
    //         qty: "500 g",
    //         mrp: 48,
    //         price: 45,
    //         url: "https://cdn.zeptonow.com/production///tr:w-200,ar-900-900,pr-true,f-webp,q-80/inventory/product/b76e5241-336b-4855-8f7b-8c06dfaa9809-tmp/9e1d67c8-2978-4f34-a209-41e9cda175c3.jpeg"
    //     },
    //     {
    //         id: 6,
    //         name: "Tender Coconut (Nariyal)",
    //         qty: "1 pc (Min. 200 ml water)",
    //         mrp: 68,
    //         price: 54,
    //         url: "https://cdn.zeptonow.com/production///tr:w-200,ar-4008-4008,pr-true,f-webp,q-80/inventory/product/4f18efd6-6115-43c6-80be-f51e45e8e042-shutterstock_486923446.jpg"
    //     },
    //     {
    //         id: 7,
    //         name: "Tomato Local",
    //         qty: "1 KG",
    //         mrp: 63,
    //         price: 50,
    //         url: "https://cdn.zeptonow.com/production///tr:w-200,ar-500-500,pr-true,f-webp,q-80/inventory/product/5359d1d5-1d7e-49e7-a6ad-30df240845be-110d6670-2e64-4979-a730-e39ed5974482.jpeg"
    //     },
    //     {
    //         id: 8,
    //         name: "Potato",
    //         qty: "1 KG",
    //         mrp: 46,
    //         price: 37,
    //         url: "https://cdn.zeptonow.com/production///tr:w-200,ar-597-403,pr-true,f-webp,q-80/inventory/product/a9d4a096-7c1b-4b9f-bbc5-7fc992ec146a-potato-1-kg-product-images-o590000090-p590000090-0-202207291750.jpg"
    //     },

    // ]

    let mrpTotal = 0;
    let saleTotal = 0;
    let handelingCharges = 0;
    let deliveryCharges = 0;

    for (let item in cartData) {
        console.log("item", item, item.mrp, item.price)
        mrpTotal += cartData[item].mrp * cartData[item].productQty
        saleTotal += cartData[item].price * cartData[item].productQty
    }
    console.log("mrpTotal", mrpTotal, saleTotal);
    let grossTotal = saleTotal + handelingCharges + deliveryCharges;
    let totalSaving = mrpTotal - saleTotal;
    let savingPercent = Math.round((totalSaving / mrpTotal) * 100);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const razorPayData = await axiosClient.get("/order/getRazorPayKey")
        const razorPayId = razorPayData?.data?.result?.razorPayKey;

        console.log("razorPayId", razorPayId)
        const actualOrderData = await axiosClient.post("/order/createOrder", {
            userId: userData?._id,
            userName: userData?.firstName + " " + userData?.lastName,
            grossTotal: grossTotal,
            products: cartData
        })

        console.log("checkoutResponse", actualOrderData)
        const orderData = actualOrderData?.data?.result;
        console.log("checkoutResponse order", orderData)

        const options = {
            key: razorPayId, // Enter the Key ID generated from the Dashboard
            amount: Number(grossTotal * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Tushar SuperMart",
            description: "Grocery Items Transaction",
            image: "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/402983990_896945812093686_2273992641898639599_n.jpg?ccb=11-4&oh=01_AdSCmKwNO04bqXFH27mVbBz1YroWdCNurmBkmY4F9m_nVA&oe=659A9F9C&_nc_sid=e6ed6c&_nc_cat=107",
            order_id: orderData.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${process.env.REACT_APP_BASE_URL}/order/paymentVerification`,
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

        console.log("window", window)
        const razorPay = new window.Razorpay(options);
        console.log("razorPay", razorPay)
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