import React, { useEffect, useState } from 'react'
import { BsCartCheckFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { IoCheckboxSharp } from "react-icons/io5";
import { RiEBikeFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { HiMenu } from "react-icons/hi";

function MyOrders() {

  const navigate = useNavigate();
  // normalize backend status (VERY IMPORTANT)

  // proper mapping
  const statusToStep = {
    "PLACED": 1,
    "PACKED": 2,
    "IN WAREHOUSE": 3,
    "SHIPPED": 4,
    "OUT FOR DELIVERY": 5,
    "DELIVERED": 6
  };


  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const stepIcons = [BsCartCheckFill, FaBoxOpen, FaHouse, FaTruck, RiEBikeFill, IoCheckboxSharp];
  const stepLabels = ["Order Placed", "Order Packed", "In Warehouse", "Shipped", "Out for Delivery", "Delivered"]
  const stepDates = Array(stepLabels.length).fill(null);
  const buttonText = ["All Orders", "Unpaid", "In Progress", "Shipped", "Delivered", "Cancelled"]
  const [activeButton, setActiveButton] = useState("All Orders");
  const [openTrackingProduct, setOpenTrackingProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${BASE_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedOrders = [...res.data.orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );


        setOrders(sortedOrders);

      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders, please try again later");
      }
    };

    fetchOrders();

    // Poll every 15 seconds to get updated orderStatus
    const interval = setInterval(fetchOrders, 15000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  const filteredOrders = orders.filter((order) => {
    const normalizedStatus = order.orderStatus?.trim().toUpperCase();

    if (activeButton === "All Orders") return true;
    if (activeButton === "Unpaid") {
      const paymentLabel = order.paymentMethod === "RAZORPAY"
        ? "PAID"
        : (normalizedStatus === "DELIVERED" ? "PAID" : "UNPAID");
      return paymentLabel === "UNPAID";
    }
    if (activeButton === "Delivered") return normalizedStatus === "DELIVERED";
    if (activeButton === "Shipped") return normalizedStatus === "SHIPPED";
    if (activeButton === "In Progress") return ["PLACED", "PACKED", "IN WAREHOUSE", "SHIPPED", "OUT FOR DELIVERY"].includes(normalizedStatus);
    if (activeButton === "Cancelled") return normalizedStatus === "CANCELLED";

    return true; // default fallback
  });


  return (
    <div>
      <div className='flex flex-col gap-1 lg:gap-3 bg-blue-950 w-full h-auto'>
        <h1 className='text-lg md:text-2xl lg:text-3xl font-bold text-white mt-10 px-6 lg:px-15'>My Orders</h1>
        <p className='text-lg font-semibold text-white mt-2 lg:mt-5 mb-10  px-6 lg:px-15'>You have {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      <div className='flex justify-between items-center gap-3 md:gap-5 xl:gap-10 mt-10  px-6 md:px-10 xl:px-20'>

        <div className='relative'>

          <HiMenu
            size={25}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-white bg-blue-950 font-semibold w-auto h-auto rounded-xl p-2 text-2xl' />


          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-2 md:hidden bg-white shadow-lg rounded-xl p-4 w-48 
                  flex flex-col gap-3 z-50">
              {
                buttonText.map((text, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setActiveButton(text)

                    }
                    className={`text-xl font-semibold text-left w-full`}>
                    {text}
                  </button>
                ))
              }
            </div>
          )}

        </div>

        {
          buttonText.map((text, i) => (
            <button
              key={i}
              onClick={() =>
                setActiveButton(text)

              }
              className={`flex-1 text-sm lg:text-xl font-semibold hidden md:block md:items-center md:justify-center rounded-2xl p-3 md:p-4 xl:p-5 gap-2 md:gap-3 xl:gap-5 md:h-16
               cursor-pointer hover:scale-105 transition-all duration-300 ${activeButton === text ? "bg-blue-950 text-white" : "bg-gray-400 text-white"}`}>
              {text}
            </button>
          ))
        }
      </div>

      <div>
        <ul>
          {filteredOrders.map((order) => {
            const normalizedStatus = order.orderStatus?.trim().toUpperCase();

            let paymentLabel = "";

            if (order.paymentMethod === "RAZORPAY") {
              paymentLabel = "PAID";
            } else if (order.paymentMethod === "COD") {
              paymentLabel = normalizedStatus === "DELIVERED" ? "PAID" : "UNPAID";
            }

            const currentStep = statusToStep[normalizedStatus] || 1;
            let progress = (currentStep - 1) / (stepLabels.length - 1);


            const today = new Date();
            const expected = order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate) : null;
            const oneDay = 1000 * 60 * 60 * 24;
            let days = expected ? Math.ceil((expected - today) / oneDay) : null;


            let deliveryMessage = "";

            if (normalizedStatus === "DELIVERED") {
              deliveryMessage = "Delivered";
            }
            else if (days === null) {
              deliveryMessage = "Delivery date not available";
            }
            else if (days <= 0) {
              deliveryMessage = "Delivering Today";
            }
            else if (days === 1) {
              deliveryMessage = "Delivering Tomorrow";
            }
            else {
              deliveryMessage = `Your Order will be Delivered within ${days} days`;
            }


            return (
              <li key={order._id}>


                {/* Order Info */}
                <div className='flex flex-col mt-6 gap-3 px-7 md:px-15'>
                  <p className='text-xl md:text-2xl text-gray-900 font-semibold'>Order Status:
                    <span className='text-lg md:text-xl text-gray-700 font-medium px-2'>{order.orderStatus}</span>
                  </p>

                  <p className='text-xl md:text-2xl text-gray-900 font-semibold'>
                    Payment:
                    <span className={`text-lg md:text-xl font-medium px-2 ${paymentLabel === "PAID" ? "text-green-600" : "text-red-600"
                      }`}>
                      {paymentLabel}
                    </span>
                  </p>


                  <p className="text-md md:text-lg text-gray-600 font-semibold">
                    {deliveryMessage}
                  </p>

                  <p className='text-lg md:text-2xl text-gray-900 font-semibold'>Order ID: <br />
                    <span className='text-lg md:text-xl text-gray-700 font-medium px-2'>{order._id}</span>
                  </p>
                </div>

                <div className='px-15'>
                  {order.items.map((item) => (
                    <div key={item.productId} className='mb-5'>
                      {/* Product Card */}
                      <div className='flex flex-col md:flex-row gap-5 py-10 mt-6 md:mt-10 px-6 md:px-15 bg-gray-100 items-center text-center md:text-left h-auto md:h-60 rounded-2xl relative'>
                        <img src={item.image} alt="orderedproductimage" className='w-25 h-25 md:w-35 md:h-35 rounded-2xl' />
                        <div className='flex flex-col gap-3 px-2'>
                          <p className='text-lg md:text-xl font-semibold text-gray-950'>{item.title}</p>
                          <p className='text-lg md:text-xl font-semibold text-gray-950'>Price:
                            <span className='text-md md:text-lg font-semibold text-gray-950 px-2'>₹{item.price}</span>
                          </p>
                          <p className='text-lg md:text-xl font-semibold text-gray-950'>Quantity:
                            <span className='text-md md:text-lg font-semibold text-gray-950 px-2'>{item.quantity}</span>
                          </p>

                          {(normalizedStatus === "PLACED" || normalizedStatus === "PACKED")
                            && (
                              <div className='mt-3'>
                                <button className='w-35 bg-blue-950 cursor-pointer text-white font-semibold rounded-xl px-5 py-4 hover:scale-105 transition-all duration-300'>Cancel Order</button>
                              </div>
                            )}

                          {normalizedStatus === "DELIVERED" && (
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                              <div className="flex gap-4">
                                <button className="w-25 bg-blue-950 text-white font-semibold rounded-xl px-5 py-3 hover:scale-105 transition-all duration-300">
                                  Return
                                </button>

                                <button className="w-25 bg-blue-950 text-white font-semibold rounded-xl px-5 py-3 hover:scale-105 transition-all duration-300">
                                  Exchange
                                </button>
                              </div>

                              <p className="text-sm md:text-base font-semibold text-gray-600">
                                Product must be returned within 7 days
                              </p>

                            </div>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            setOpenTrackingProduct(
                              item.productId === openTrackingProduct ? null : item.productId
                            )
                          }
                          className="
    absolute 
    right-4 
    bottom-4 
    md:bottom-auto 
    md:top-1/2 
    md:-translate-y-1/2 
    cursor-pointer
  "
                        >
                          <IoIosArrowForward size={30} />
                        </button>
                        {normalizedStatus === "DELIVERED" && (

                          <button
                            onClick={() => navigate(`/product/${item.productId}`, { state: { openReviews: true } })}
                            className='text-red-800 font-semibold text-xl cursor-pointer hover:scale-100 transition-all duration-300 ml-auto mt-40'>
                            Review
                          </button>
                        )}
                      </div>

                      {/* Tracking Section */}
                      {/* ================= TRACKING ================= */}
                      {openTrackingProduct === item.productId && (

                        <div className="mt-6 bg-gray-50 rounded-2xl p-6 relative">

                          <h2 className="text-xl font-semibold mb-1">
                            Order Tracking
                          </h2>
                          <p className="text-gray-400 mb-6">
                            Tracking ID #{order._id}
                          </p>

                          {/* ===== DESKTOP ===== */}
                          <div className="hidden md:block relative">

                            {/* LINE */}
                            <div className="absolute left-14 right-14 top-7 h-1">
                              <div className="absolute inset-0 bg-gray-300 rounded-full" />
                              <div
                                className="absolute left-0 top-0 h-1 bg-pink-600 rounded-full transition-all duration-500"
                                style={{ width: `${progress * 100}%` }}
                              />
                            </div>

                            <div className="flex justify-between">
                              {stepIcons.map((IconComponent, i) => {
                                const active = i < currentStep
                                return (
                                  <div key={i} className="flex flex-col items-center flex-1">
                                    <div
                                      className={`z-10 w-14 h-14 rounded-full flex items-center justify-center
                ${active ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-400"}`}
                                    >
                                      <IconComponent size={26} />
                                    </div>

                                    <p className={`mt-4 text-sm font-semibold ${active ? "text-black" : "text-gray-400"}`}>
                                      {stepLabels[i]}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* ===== MOBILE ===== */}
                          <div className="md:hidden relative">

                            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-300 rounded-full" />
                            <div
                              className="absolute left-6 top-0 w-1 bg-pink-600 rounded-full transition-all duration-500"
                              style={{ height: `${progress * 100}%` }}
                            />

                            <div className="flex flex-col gap-10">
                              {stepIcons.map((IconComponent, i) => {
                                const active = i < currentStep
                                return (
                                  <div key={i} className="flex items-center gap-4">
                                    <div
                                      className={`z-10 w-12 h-12 rounded-full flex items-center justify-center
                ${active ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-400"}`}
                                    >
                                      <IconComponent size={22} />
                                    </div>

                                    <p className={`text-sm font-semibold ${active ? "text-black" : "text-gray-400"}`}>
                                      {stepLabels[i]}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>

                          </div>

                        </div>
                      )}

                    </div>
                  )

                  )}
                </div>
              </li>
            )

          }


          )}
        </ul>
      </div>
    </div>
  )
}

export default MyOrders;
