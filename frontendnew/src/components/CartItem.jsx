import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex justify-between items-start bg-gray-100 rounded-2xl p-3 border border-gray-200 mb-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-xl"
      />

      <div className="flex-1 flex flex-col ml-3 gap-2">
        <h3 className="font-bold text-lg">{item.title}</h3>

        <div className="flex items-center gap-3">
          <button onClick={() => decreaseQuantity(item._id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item._id)}>+</button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button onClick={() => removeFromCart(item.id)}>
          <RiDeleteBin7Fill size={20} className="text-red-500" />
        </button>
        <p className="font-semibold">₹{item.price * item.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
