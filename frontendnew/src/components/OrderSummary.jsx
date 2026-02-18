import React, { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { useCart } from "../context/CartContext";

function OrderSummary() {
  const { cartItems } = useCart();
  const [showCoupon, setShowCoupon] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
   <div className="w-full lg:w-[580px] min-h-[400px] border rounded-xl p-4 sm:p-5 shadow-sm h-fit bg-gray-100 overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Order summary</h1>

      {/* Cart Items */}
      <div className="flex flex-col gap-4 border-b pb-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex gap-3 sm:gap-4 min-w-0">

            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {item.quantity}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold truncate">{item.title}</h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description || "Product description..."}
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Vendor:</span> {item.vendor || "Store"}
              </p>
            </div>

            {/* Price */}
            
            <p className="font-semibold shrink-0 text-right">

              ₹{Number(item.price) * item.quantity}
            </p>

          </div>
        ))}
      </div>

      {/* Coupon */}
      <div
        className="flex justify-between items-center py-4 cursor-pointer border-b"
        onClick={() => setShowCoupon(!showCoupon)}
      >
        <p className="font-semibold">Add coupons</p>
        <BiSolidDownArrow
          className={`transition-transform ${showCoupon ? "rotate-180" : ""}`}
        />
      </div>

      {showCoupon && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Enter coupon"
            className="border p-2 rounded-md w-full"
          />
          <button className="bg-black text-white px-4 rounded-md">
            Apply
          </button>
        </div>
      )}

      {/* Totals */}
      <div className="mt-4 flex justify-between text-lg">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="mt-3 flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
