import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart as addCartApi, removeCartItem as removeCartApi, updateCartItem } from "../api/cartApi";

// create context

const CartContext = createContext();

// provider

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    //fetch cart from backend on load

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const data = await getCart(token); // backend returns array
                setCartItems(data || []); // directly set array
            } catch (error) {
                console.error("Error fetching cart:", error.response?.data || error.message);
            }
        };

        fetchCart();
    }, []);


    // add to cart

    const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("LOGIN_REQUIRED");
    }

    openCart();

    const productId = product._id || product.id;
    const quantity = product.quantity || 1;

    if (!productId) {
        console.error("Cannot add to cart: productId is missing", product);
        return;
    }

    try {
        await addCartApi(productId, quantity, token);
        const data = await getCart(token);
        setCartItems(data || []);
    } catch (error) {
        console.error(
            "Error adding to cart:",
            error.response?.data || error.message
        );
    }
};


    // remove item

    const removeFromCart = async (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await removeCartApi(id, token); // matches import
            const data = await getCart(token);
            setCartItems(data || []);

        } catch (error) {
            console.error("error removing item:", error.response?.data || error.message);
        }
    };

    const increaseQuantity = async (_id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Find item in cart
        const item = cartItems.find(item => item._id === _id);
        if (!item) return;

        const newQuantity = item.quantity + 1;

        // Optimistically update frontend
        setCartItems(prev =>
            prev.map(item => item._id === _id ? { ...item, quantity: newQuantity } : item)
        );

        try {
            // Update backend
            await updateCartItem(_id, newQuantity, token);
        } catch (error) {
            console.error("Error updating quantity:", error.response?.data || error.message);
            // Revert frontend if API fails
            setCartItems(prev =>
                prev.map(item => item._id === _id ? { ...item, quantity: item.quantity - 1 } : item)
            );
        }
    };

    const decreaseQuantity = async (_id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Find item in cart
        const item = cartItems.find(item => item._id === _id);
        if (!item) return;

        const newQuantity = item.quantity - 1;

        if (newQuantity > 0) {
            // Optimistically update frontend
            setCartItems(prev =>
                prev.map(item => item._id === _id ? { ...item, quantity: newQuantity } : item)
            );

            try {
                // Update backend
                await updateCartItem(_id, newQuantity, token);
            } catch (error) {
                console.error("Error updating quantity:", error.response?.data || error.message);
                // Revert frontend if API fails
                setCartItems(prev =>
                    prev.map(item => item._id === _id ? { ...item, quantity: item.quantity + 1 } : item)
                );
            }
        } else {
            // Remove item if quantity drops to 0
            setCartItems(prev => prev.filter(item => item._id !== _id));

            try {
                await removeCartApi(_id, token);
            } catch (error) {
                console.error("Error removing item:", error.response?.data || error.message);
                // Revert frontend if API fails
                setCartItems(prev => [...prev, item]);
            }
        }
    };

    const clearCart = async () => {
        setCartItems([]); // clear frontend

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Remove all items from backend cart
            await Promise.all(cartItems.map(item => removeCartApi(item._id, token)));
        } catch (error) {
            console.error("Error clearing cart:", error.response?.data || error.message);
        }
    };


    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,   // ✅ MISSING BEFORE
                decreaseQuantity,   // ✅ MISSING BEFORE
                isCartOpen,
                openCart,
                closeCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// hook
export const useCart = () => useContext(CartContext);
