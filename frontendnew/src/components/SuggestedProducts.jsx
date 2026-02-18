import React from "react";
import { useCart } from "../context/CartContext";


function SuggestedProducts({ cartItems, allProducts }) {
    const { addToCart } = useCart();
     if (!cartItems || !allProducts) return null;

    // Get categories of cart items
    const cartCategories = cartItems.map(item => item.category).filter(Boolean);

    
    const suggestedProducts = allProducts.filter(product =>
        cartCategories.includes(product.category) &&
        !cartItems.some(cartItem => cartItem._id === product._id)
    );

    if (suggestedProducts.length === 0) return null;

   


    return (
        <div className="w-full mt-14 px-4">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                You may also like
            </h2>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((product) => (

                    <div
                        key={product._id}
                        className="border rounded-xl p-4 flex flex-col items-center gap-4 
                        hover:shadow-md transition bg-white"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 object-cover rounded-lg"
                        />

                        <h3 className="font-semibold text-center text-base sm:text-lg">
                            {product.title}
                        </h3>

                        <p className="text-gray-700 font-bold">
                            ₹{product.price}
                        </p>

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-auto bg-black text-white px-5 py-2 rounded-lg
                            hover:bg-gray-900 hover:scale-105 transition-all duration-300"
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestedProducts;
