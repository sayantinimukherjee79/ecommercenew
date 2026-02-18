import React, { useState } from 'react'
import { IoCartOutline } from "react-icons/io5";

import { TfiReload } from "react-icons/tfi";
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom"

import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




function JewelleryCard({ id, image, title, price, showActions = true, isNew = false, isOnSale = false }) {
  const [loaded, setLoaded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">

      <Link to={`/product/${id}`} className='w-full'>
        {/* Image */}
        <div
          className={`w-full h-56 rounded-md overflow-hidden relative ${loaded ? "" : "bg-gray-200 animate-pulse"
            }`}
        >

          {/* in case of new products */}
          {
            isNew && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                NEW
              </span>
            )
          }

          <img
            src={image}
            alt={title}
            // this tells the browser load image immediately after loading the webpage
            loading='eager'
            onLoad={() => setLoaded(true)}
            className={`w-full h-56 object-cover rounded-md transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
              }`}
          />

        </div>


        {/* Text */}

        {title && (
          <h1 className="text-lg font-semibold text-gray-800 mt-2">
            {title}
          </h1>
        )
        }

        {
          price && (
            <h2 className="text-lg font-semibold text-gray-900 mt-2">
              ₹{price}
            </h2>
          )
        }

      </Link>

      {/* Icons */}
      {
        showActions && (
          <div className="flex gap-4 mt-10">
            <div className='relative group'>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!id) {
                    console.error("Product ID is undefined, cannot add to cart");
                    toast.error("Cannot add this product to cart. Please try again.");
                    return;
                  }

                  try {
                    await addToCart({
                      _id: id,
                      title,
                      price,
                      image,
                      quantity: 1,
                    });

                    toast.success("Product added to cart!");

                  } catch (error) {
                    if (error.message === "LOGIN_REQUIRED") {
                      toast.warning("Login required to add product to cart");

                      navigate("/login");
                    } else {
                      console.error("Error adding to cart:", error);
                      toast.error("Something went wrong while adding to cart");

                    }
                  }

                }}
                className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition cursor-pointer"
              >
                <IoCartOutline />
              </button>


              <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                   w-max bg-gray-900 text-white text-sm px-2 py-2
                   rounded opacity-0 group-hover:opacity-100 
                   transition-opacity whitespace-nowrap'>
                Add to Cart
              </span>
            </div>


            <div className='relative group'>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const product = { id, image, title, price, inStock: true };

                  try {
                    if (isInWishlist(id)) {
                      removeFromWishlist(id);
                    } else {
                      await addToWishlist(product); // this now throws LOGIN_REQUIRED if not logged in
                    }
                  } catch (err) {
                    if (err.message === "LOGIN_REQUIRED") {
                      toast.warning("Login required to add to wishlist");

                      navigate("/login"); // redirect to login
                    } else {
                      console.error("Error adding to wishlist:", err);
                    }
                  }
                }}
                className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition cursor-pointer"
              >
                {isInWishlist(id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>


              <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                   w-max bg-gray-900 text-white text-sm px-2 py-2
                   rounded opacity-0 group-hover:opacity-100 
                   transition-opacity whitespace-nowrap'>
                Wishlist
              </span>

            </div>


            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition cursor-pointer">
                <TfiReload />
              </button>

              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                   w-max bg-gray-900 text-white text-sm px-2 py-2
                   rounded opacity-0 group-hover:opacity-100 
                   transition-opacity whitespace-nowrap">
                Compare
              </span>
            </div>

          </div>

        )
      }

    </div>
  )
}

export default JewelleryCard