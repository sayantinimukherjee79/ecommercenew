import React, { useState } from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHandPointUp } from "react-icons/fa";
import CartSidebar from './CartSidebar';
import { useCart } from '../context/CartContext';

function Scrollup() {
    const { isCartOpen, openCart, closeCart, cartItems } = useCart();

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <>

            <div className="fixed right-6 top-[55%] z-40">
                <div className="flex flex-col gap-4">
                    <div onClick={openCart}
                        className="relative w-14 h-14 bg-white flex items-center justify-center rounded-full shadow-md hover:shadow-xl 
                  cursor-pointer transition-all duration-300 hover:scale-105">
                        <FiShoppingBag className="text-gray-800 text-xl" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold 
      w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow-md hover:shadow-xl 
                  cursor-pointer transition-all duration-300 hover:scale-105">
                        <FaRegHandPointUp className="text-gray-800 text-xl" />
                    </div>
                </div>

            </div>

            {/* cart slide panel */}
            <CartSidebar />
        </>

    )
}

export default Scrollup