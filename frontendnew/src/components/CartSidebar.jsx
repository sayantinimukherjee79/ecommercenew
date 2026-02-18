import React from 'react';
import { IoClose, IoBag } from "react-icons/io5";
import { useCart } from '../context/CartContext';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <>
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300
        ${isCartOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-40
        w-full sm:w-[380px] md:w-[420px] lg:w-[450px]
        transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="relative flex items-center p-4 border-b">
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 items-center">
            <IoBag size={22} />
            <h2 className="text-lg font-semibold">Cart</h2>
          </div>

          <button onClick={closeCart} className="ml-auto">
            <IoClose size={24} />
          </button>
        </div>

        {/* content */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-190px)]">
          {cartItems.length === 0 && (
            <div className="text-center text-gray-600 flex flex-col gap-4 text-lg mt-20">
              Your Cart is Empty
              <button
                onClick={closeCart}
                className="bg-black text-white px-6 py-3 rounded-xl font-semibold"
              >
                Back to Shop
              </button>
            </div>
          )}

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-3 bg-gray-100 rounded-2xl p-3 border border-gray-200"
            >
              {/* image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-xl shrink-0"
              />

              {/* details */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 font-semibold">
                  Vendor: {item.vendor || "N/A"}
                </p>

                {/* quantity */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-sm font-semibold">Qty</span>

                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="border px-2 rounded font-semibold text-lg hover:bg-black hover:text-white transition"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold text-gray-700">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="border px-2 rounded font-semibold text-lg hover:bg-black hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* price + delete */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <RiDeleteBin7Fill size={22} />
                </button>

                <p className="font-semibold text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-white p-4 border-t">
            <h2 className="text-base font-bold text-center mb-4">
              Payment Details
            </h2>

            <div className="flex justify-between text-sm font-semibold mb-4">
              <span>Sub Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 border border-black py-3 rounded-lg font-semibold"
                onClick={() => {
                  closeCart();
                  navigate("/cart");
                }}
              >
                View Cart
              </button>

              <button
                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
                onClick={() => {
                  closeCart();
                  navigate("/place-order");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
