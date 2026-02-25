import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const WishlistContext = createContext();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  //fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlistItems(Array.isArray(res.data) ? res.data : res.data.items);


    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };


  useEffect(() => {
    fetchWishlist();
  }, []);


  //add peoduct to wishlist

  const addToWishlist = async (product) => {

  const productId = product._id || product.id;
  if (!productId) {
    console.error("Cannot add to wishlist: product ID is missing", product);
    return;
  }

  const token = localStorage.getItem("token");

  // 🔴 LOGIN CHECK
  if (!token) {
    throw new Error("LOGIN_REQUIRED");
  }

  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    await axios.post(
      `${BASE_URL}/api/wishlist/add`,
      { productId },
      config
    );

    const exists = wishlistItems.find((item) => item._id === productId);
    if (exists) return;

    setWishlistItems([...wishlistItems, { ...product, _id: productId }]);

  } catch (error) {
    console.error(
      "Failed to add to wishlist",
      error.response?.data || error.message
    );
  }
};



  const removeFromWishlist = async (id) => {

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      data: { productId: id },
    };

    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/wishlist/remove`,

        config
      );

      if (data && data.items) {
        setWishlistItems(data.items);
      } else {
        setWishlistItems((prev) => prev.filter((item) => item._id !== id));
      }


    } catch (error) {
      console.error("Failed to remove from wishlist", error.response?.data || error.message);
    }

  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
