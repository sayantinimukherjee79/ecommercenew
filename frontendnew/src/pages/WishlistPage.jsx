import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaTrash, FaHeartBroken } from "react-icons/fa";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <FaHeartBroken className="text-6xl text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700">
          Your wishlist is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="mt-3 font-semibold text-lg">{item.title}</h2>
            <p className="text-gray-700 font-bold mt-1">₹{item.price}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item._id)}
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
