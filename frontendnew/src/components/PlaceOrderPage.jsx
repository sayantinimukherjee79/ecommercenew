import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import countries from '../data/Countries';
import States from '../data/States';
import { useNavigate } from 'react-router-dom';
import OrderSummary from "../components/OrderSummary";
import { placeOrder } from "../api/orderApi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";


function PlaceOrderPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);


  const handlePlaceOrder = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to place your order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
     toast.warning("Your cart is empty");
      return;
    }

    if (!email || !firstName || !lastName || !country ||
      !state || !city || !address || !pinCode || !paymentMethod) {
     toast.warning("Please fill all required fields");
      return;
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const items = cartItems.map((item) => ({
      productId: item._id || item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const orderData = {
      email,
      customerName: { firstName, lastName },
      address: {
        country,
        state,
        city,
        addressLine: address,
        pinCode,
        phone,
      },
      items,
      totalAmount,
      paymentMethod,
      orderNote,
    };

    // ⭐ COD FLOW
    if (paymentMethod === "COD") {
      try {
        setLoading(true);

        const response = await placeOrder(orderData);

        const orderId = response?.data?.order?._id;

        clearCart();
        navigate(`/order-success/${orderId}`);

      } catch (error) {
        console.error(error);
        toast.error("Order failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ⭐ ONLINE PAYMENT FLOW
    try {

      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      // create razorpay order
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // paise
      });

      const razorOrder = await res.json();

      const options = {

        key: "rzp_test_SHEmToxLCjK9w5",   // YOUR REAL KEY

        amount: razorOrder.amount,
        currency: "INR",
        name: "My Ecommerce Store",
        description: "Order Payment",
        order_id: razorOrder.id,

        handler: async function (response) {

          try {

            const finalResponse = await placeOrder({
              ...orderData,
              paymentMethod: "RAZORPAY",   // ⭐ IMPORTANT FIX
              paymentStatus: "PAID",
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });


            const orderId = finalResponse?.data?.order?._id;

            clearCart();
            navigate(`/order-success/${orderId}`);

          } catch (error) {
            console.error("ORDER SAVE ERROR:", error.response?.data || error);
            toast.error("Payment succeeded but order save failed");
          }
        },

        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phone || "",
        },

        theme: { color: "#1d4ed8" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment failed to start");

    }
  };




  return (
    <>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT FORM */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-2xl sm:text-3xl font-semibold">Contact Information</h1>

            <input
              type="text"
              placeholder="Email Address"
              className="p-4 border border-black text-lg font-semibold"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />

            <h1 className="text-sm sm:text-lg font-semibold">
              you are currently checking out as a guest
            </h1>

            <h1 className="text-2xl sm:text-3xl font-semibold mt-4">Billing address</h1>

            <select
              className="p-4 border border-black text-lg font-semibold"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country/Region</option>
              {countries.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 border border-black text-lg font-semibold"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 border border-black text-lg font-semibold"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="p-4 border border-black text-lg font-semibold"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                className="p-4 border border-black text-lg font-semibold"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <select
                className="p-4 border border-black text-lg font-semibold"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {States.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="PIN Code"
                className="p-4 border border-black text-lg font-semibold"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone (optional)"
                className="p-4 border border-black text-lg font-semibold"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold mt-4">Payment options</h1>

            <select
              className="p-4 border border-black text-lg font-semibold"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE">Online Payment</option>

            </select>

            <p className="text-sm sm:text-base font-semibold mt-4">
              By proceeding, you agree to our Terms & Privacy Policy
            </p>

            <div className="flex flex-col sm:flex-row justify-between gap-5 mt-8">
              <button
                onClick={() => navigate("/cart")}
                className="flex gap-2 items-center text-lg font-semibold underline"
              >
                <FaArrowLeftLong />
                Return to Cart
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`px-6 py-4 text-lg text-white font-semibold rounded-xl transition
                ${loading ? "bg-gray-400" : "bg-blue-950 hover:bg-blue-800 hover:scale-105"}`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>

          {/* RIGHT SUMMARY */}

          <OrderSummary />


        </div>
      </div>
    </>
  );
}

export default PlaceOrderPage;
