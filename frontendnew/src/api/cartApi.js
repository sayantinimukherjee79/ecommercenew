import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/api/cart`;


export const addToCart = async(productId, quantity, token) => {
    const res = await axios.post(
        `${API_URL}/add`,
        { productId, quantity },  // ✅ this is correct
        { headers: {Authorization: `Bearer ${token}`} }
    );
    return res.data;
};


export const getCart = async (token) => {
    const res = await axios.get(API_URL,{
        headers: {Authorization: `Bearer ${token}`},

    });

    return res.data;
};

export const removeCartItem = async (cartItemId, token) => {
    const res = await axios.delete(`${API_URL}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId: cartItemId }, // ✅ fixed here
    });

    return res.data;
};


export const updateCartItem = async (cartItemId, quantity, token) => {
    const res = await axios.put(
        `${API_URL}/update`,
        { productId: cartItemId, quantity }, // ✅ use cartItemId here
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
};
