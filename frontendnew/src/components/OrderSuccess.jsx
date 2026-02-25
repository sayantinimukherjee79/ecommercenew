import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {

                const token = localStorage.getItem("token");
                console.log(localStorage.getItem("token"));

                const BASE_URL = import.meta.env.VITE_API_BASE_URL;

                const res = await axios.get(
                    
                    `${BASE_URL}/api/orders/${id}`,  
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } 
                );

                setOrder(res.data.order);

            } catch (error) {

                console.error("failed to fetch order", error);
                setOrder(null);

            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl text-gray-600 font-semibold">Loading order details...</p>
            </div>
        );

    }

    // Fallback (refresh / direct access safety)
    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Order details not found
                    </h2>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 sm:p-8 text-center">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Order Placed Successfully 🎉
                </h1>

                <p className="text-gray-600 mt-3 text-sm sm:text-base">
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-1">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Order ID:</span>{" "}
                        {order._id}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Total Amount:</span>{" "}
                        ₹{order.totalAmount}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Payment Method:</span>{" "}
                        {order.paymentMethod}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Items:</span>{" "}
                        {order.items.length}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Go to Home
                    </button>

                    <button
                        onClick={() => navigate("/my-order")}
                        className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
