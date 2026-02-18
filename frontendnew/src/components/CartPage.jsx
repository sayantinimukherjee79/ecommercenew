import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import SuggestedProducts from './SuggestedProducts';
import { BiSolidDownArrow } from "react-icons/bi";
import { FaSadTear } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/productApi";


function CartPage() {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [showCoupon, setShowCoupon] = useState(false);
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setAllProducts(data || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);



    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mt-4 mb-8">
                Cart
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT: CART ITEMS */}
                <div className="flex-1">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center text-center gap-4 text-gray-600 mt-10">
                            <FaSadTear size={80} />
                            <p className="text-2xl sm:text-4xl font-semibold">
                                Your cart is empty
                            </p>
                            <p className="text-lg sm:text-2xl font-semibold mt-6">
                                New in Store
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />

                        ))
                    )}
                </div>

                {/* RIGHT: CART TOTALS */}
                {cartItems.length > 0 && (
                    <div className="w-full lg:w-[380px] bg-gray-100 p-4 sm:p-6 rounded-xl h-fit">
                        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
                            Cart Totals
                        </h2>

                        {/* Coupon Toggle */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setShowCoupon(!showCoupon)}
                        >
                            <span className="font-medium text-sm sm:text-base">
                                Add Coupons
                            </span>
                            <BiSolidDownArrow
                                size={18}
                                className={`transition-transform duration-300 ${showCoupon ? "rotate-180" : ""}`}
                            />
                        </div>

                        {/* Coupon Input */}
                        {showCoupon && (
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter coupon"
                                    className="flex-1 px-4 py-3 border rounded-lg text-sm sm:text-base"
                                />
                                <button className="bg-blue-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                                    Apply
                                </button>
                            </div>
                        )}

                        {/* Total */}
                        <div className="flex justify-between items-center mt-6 text-base sm:text-lg font-semibold">
                            <span>Estimated total</span>
                            <span>₹{subtotal}</span>
                        </div>

                        {/* Checkout */}
                        <button
                            onClick={() => navigate("/place-order")}
                            className="w-full bg-indigo-900 text-white py-4 rounded-xl mt-6 font-semibold
                            hover:bg-indigo-700 hover:scale-[1.02] transition-all"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* SUGGESTED PRODUCTS */}
            {cartItems.length > 0 && (
                <div className="mt-12">
                    <SuggestedProducts
                        cartItems={cartItems}
                        allProducts={allProducts}
                    />

                </div>
            )}
        </div>
    );
}

export default CartPage;
