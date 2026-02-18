import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

function Demo() {

    const navigate = useNavigate();
    const { isCartOpen } = useCart();

    const handleCheckout = () => {
        navigate("/checkout"); // <-- navigates to checkout page
    };

    if (isCartOpen) return null;

    return (
        <div className="fixed right-4 md:right-6 top-[40%] -translate-y-1/2 z-50">
            <div className="flex flex-col gap-3 md:gap-4">
                {/* Demo Button */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-pink-500 flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer 
                    shadow-md hover:shadow-xl 
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:bg-pink-600">
                    <FaRegEye className="text-white text-xl sm:text-2xl md:text-3xl mt-2 transition-transform duration-300" />
                    <h1 className="text-white text-xs sm:text-sm md:text-base font-semibold">
                        Demos
                    </h1>
                </div>

                {/* Buy Now Button */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-800 flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer 
                    shadow-md hover:shadow-xl 
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:bg-blue-900"
                    onClick={handleCheckout}>
                    <IoCart className="text-white text-xl sm:text-2xl md:text-3xl mt-2 transition-transform duration-300" />
                    <h1 className="text-white text-xs sm:text-sm md:text-base font-semibold">
                        Buy Now
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Demo;
