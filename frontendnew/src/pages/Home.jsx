import React, { useEffect } from 'react'
import Demo from '../components/Demo';
import Scrollup from '../components/Scrollup';
import Topup from '../components/Topup';
import CategoryCard from "../components/CategoryCard";
import FashionSale from '../components/FashionSale';
import QuickView from '../components/QuickView';
import JewelleryCard from "../components/JewelleryCard";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';


function Home() {

    const [selectProduct, setSelectproduct] = useState(null);

    const [open, setOpen] = useState(false);

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async() => {
            try{

                const res = await axios.get("http://localhost:5000/products/top-selling");
                setTopProducts(res.data);

            }catch(error){
                console.log(error);
            }
        }

        fetchTopProducts();
    },[]);


    const handelQuickView = (product) => {
        setSelectproduct(product);
        setOpen(true);
    }

    const scrolltoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const [timeLeft, seTimeleft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const saleEnddate = new Date('2026-02-04T23:59:59');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()

            // time in miliseconds
            const difference = saleEnddate - now;

            if (difference <= 0) {
                clearInterval(interval)
                seTimeleft(null);
            } else {

                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                seTimeleft({ days, hours, minutes, seconds });
            }
        }, 1000)

        return () => clearInterval(interval);

    }, [])

    return (

        <div>
            <>
                <Demo />
                <Scrollup />
                <Topup />
            </>

            <div className='flex flex-col md:flex-row gap-6'>
                {/* bg-cover---->using it because it will cober the whole container */}

                <motion.div
                    initial={{ x: -120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}

                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="w-full md:w-[60%] max-w-5xl mt-10 md:mt-10 h-96 md:h-196 bg-[url('https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg')] bg-cover bg-center flex flex-col justify-start items-start p-6 md:p-8 text-white rounded-xl gap-5"


                >
                    <h2 className='text-xl md:text-2xl font-bold mt-2 md:mt-26'>BEDROOM FURNITURE</h2>
                    <h1 className='text-2xl md:text-4xl font-bold mt-2 md:mt-5'>Transform Your <br />Sleeping Space</h1>
                    <h3 className='text-lg md:text-2xl mt-2 md:mt-5'>Elegant minimalist design inspired by Michael Kors</h3>

                    {/* ease in out-->controlls transition easein-->means start slow, fast in middle easeout means ends slow */}
                    <a href="#" className='text-base md:text-xl underline hover:text-amber-300 hover:text-2xl transition-all duration-300 ease-in-out'>Shop Now</a>
                </motion.div>

                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}

                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}

                    className="w-full sm:w-[48%] md:w-[25%] h-72 md:h-130 mt-6 md:mt-10 
               bg-[url('https://images.pexels.com/photos/30946801/pexels-photo-30946801.jpeg')] 
               bg-cover bg-center sm:bg-top md:bg-center 
               flex flex-col rounded-xl p-4 md:p-8 gap-3 md:gap-5"

                >
                    <h1 className='text-xl sm:text-2xl md:text-2xl text-white font-bold mt-8 md:mt-12'>JUST IN</h1>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold'>Mixer Juicer</h1>
                    <h1 className='text-lg sm:text-2xl md:text-2xl text-white'>Make your Own Drink</h1>
                    <a
                        href="#"
                        className='text-base sm:text-xl md:text-xl underline text-amber-50 hover:text-emerald-800 hover:text-2xl transition-all duration-300 ease-in-out'>
                        Explore Now
                    </a>
                </motion.div>



                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="w-full sm:w-[48%] md:w-[25%] h-72 md:h-130 mt-6 md:mt-10 
               bg-[url('https://images.pexels.com/photos/8082560/pexels-photo-8082560.jpeg')] 
               bg-cover bg-center sm:bg-top md:bg-center 
               flex flex-col rounded-xl p-4 md:p-8 gap-3 md:gap-5"
                >
                    <h1 className='text-lg sm:text-xl md:text-2xl text-white font-bold mt-4 md:mt-12'>TOP PICK</h1>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold'>Comfort Chair</h1>
                    <h1 className='text-lg sm:text-xl md:text-2xl text-white'>Unwind in style every evening</h1>
                    <a href="#" className='text-sm sm:text-base md:text-xl underline text-amber-50 hover:text-amber-300 hover:text-2xl transition-all duration-300 ease-in-out'>Discover More</a>
                </motion.div>


            </div>

            <motion.div
                initial={{ x: 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                }}
                className="
                    w-full sm:w-[90%] md:w-[47%] 
                    h-72 sm:h-80 md:h-60 
                    mt-10 sm:mt-10 md:-mt-60 
                    ml-0 sm:ml-0 md:absolute md:right-0 
                    bg-[url('https://images.pexels.com/photos/945688/pexels-photo-945688.jpeg')] 
                    bg-cover bg-center 
                    flex flex-col rounded-xl p-6 sm:p-8 md:p-8 gap-3 md:gap-5
                "
            >
                <h1 className='text-xl sm:text-2xl md:text-2xl text-white font-bold mt-4 md:mt-12'>SAVE UP TO 50%</h1>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold'>Premium Leather Sofa</h1>
                <a href="#" className='text-base sm:text-xl md:text-xl underline text-amber-50 hover:text-amber-300 hover:text-2xl transition-all duration-300 ease-in-out'>Shop the Deal</a>
            </motion.div>


            <section className="mt-16 px-6">

                <h1 className='text-2xl font-semibold text-gray-950'>Top Selling Products</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-6 mt-5'>

                    {
                       Array.isArray(topProducts) && topProducts.map((product) => (
                            <JewelleryCard
                            key={product._id}
                            id={product._id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                        />
                        ))
                    }

                </div>

            </section>




            <div className='flex flex-col md:flex-row gap-4'>
                <motion.div
                    initial={{ x: -120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="w-full sm:w-[90%] md:w-[50%] h-56 sm:h-64 md:h-80 mt-6 sm:mt-6 md:mt-8 ml-0 sm:mx-auto md:ml-4 bg-[url('https://images.pexels.com/photos/5706273/pexels-photo-5706273.jpeg')] bg-cover bg-center flex flex-col justify-center items-center text-center rounded-2xl p-4 sm:p-6 md:p-8"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-wide mt-4 sm:mt-6 md:mt-9">
                        Newly Dropped
                    </h1>
                    <h1 className="text-base sm:text-lg md:text-xl text-black font-bold mt-2 sm:mt-4 md:mt-6">
                        Effortlessly Stylish
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, duration: 0.2 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="w-full sm:w-[90%] md:w-[50%] h-56 sm:h-64 md:h-80 mt-6 sm:mt-6 md:mt-8 ml-0 sm:mx-auto md:ml-4 bg-[url('https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg')] bg-cover bg-center flex flex-col justify-center items-center text-center rounded-2xl p-4 sm:p-6 md:p-8"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.15em] mt-4 sm:mt-6 md:mt-17">
                        NEW ARRIVAL.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-black mt-2 sm:mt-4 md:mt-6 text-justify mx-auto">
                        Timeless denim for effortless style.
                    </p>
                </motion.div>

            </div>


            <motion.div
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-96 sm:h-150 md:h-150 bg-[url('https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg')] bg-cover bg-center flex flex-col justify-center items-center text-center mt-8 mx-auto rounded-2xl p-4 sm:p-6 md:p-8"
            >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] -mt-2 sm:-mt-4 md:-mt-25">
                    Big Savings on Top Electronics
                </h1>

                <h1 className="text-base sm:text-lg md:text-2xl text-black mt-4 sm:mt-6 md:mt-6 text-center font-bold">
                    Up to 30% OFF on refrigerators, laptops, washers & more!
                </h1>

                <button
                    onClick={scrolltoTop}
                    className="bg-blue-950 rounded-2xl text-amber-50 px-8 sm:px-10 py-4 sm:py-6 mt-6 sm:mt-8 cursor-pointer font-bold 
        hover:bg-blue-900 hover:text-white hover:scale-105 
        transition-all duration-300 ease-in-out transform"
                >
                    Shop Now
                </button>
            </motion.div>



            <div className="w-full h-50 sm:h-60 md:h-72 bg-[url('https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg')] bg-cover bg-center flex flex-col justify-center items-center text-center mt-8 ml-4 rounded-2xl p-6 sm:p-8">
                <motion.h1
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-2xl sm:text-3xl md:text-6xl text-white font-bold -mt-6"
                >
                    10% Off All Devices - Debit Card Exclusive
                </motion.h1>
            </div>



            <div className='bg-blue-100 mt-10'>

                <div className="overflow-hidden bg-blue-100 w-full px-4 sm:px-6 md:px-8">
                    <div className="flex gap-4 sm:gap-6 md:gap-10 w-max animate-marquee">

                        <FashionSale
                            image="https://images.pexels.com/photos/1877733/pexels-photo-1877733.jpeg"
                            title="Urban Chic Jumpsuit"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/3774999/pexels-photo-3774999.jpeg"
                            title="Midnight Glam Dress"
                            price="₹1,200" />

                        <FashionSale
                            image="https://images.pexels.com/photos/31019508/pexels-photo-31019508.jpeg"
                            title="Signature Denim Look"
                            price="₹899" />

                        <FashionSale
                            image="https://images.pexels.com/photos/20777203/pexels-photo-20777203.jpeg"
                            title="Salwar Set"
                            price="₹1,500" />


                        <FashionSale
                            image="https://images.pexels.com/photos/33150440/pexels-photo-33150440.jpeg"
                            title="Saree"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/8752675/pexels-photo-8752675.jpeg"
                            title="Moonlight Bridal Lehenga"
                            price="₹3,500" />


                        <FashionSale
                            image="https://images.pexels.com/photos/28512776/pexels-photo-28512776.jpeg"
                            title="Noor Chikankari Kurti"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/8330427/pexels-photo-8330427.jpeg"
                            title="Formal Trouser & Pants"
                            price="₹700" />

                        {/* duplicate 1 */}

                        <FashionSale
                            image="https://images.pexels.com/photos/1877733/pexels-photo-1877733.jpeg"
                            title="Urban Chic Jumpsuit"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/3774999/pexels-photo-3774999.jpeg"
                            title="Midnight Glam Dress"
                            price="₹1,200" />

                        <FashionSale
                            image="https://images.pexels.com/photos/31019508/pexels-photo-31019508.jpeg"
                            title="Signature Denim Look"
                            price="₹899" />

                        <FashionSale
                            image="https://images.pexels.com/photos/20777203/pexels-photo-20777203.jpeg"
                            title="Salwar Set"
                            price="₹1,500" />


                        <FashionSale
                            image="https://images.pexels.com/photos/33150440/pexels-photo-33150440.jpeg"
                            title="Saree"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/8752675/pexels-photo-8752675.jpeg"
                            title="Moonlight Bridal Lehenga"
                            price="₹3,500" />


                        <FashionSale
                            image="https://images.pexels.com/photos/28512776/pexels-photo-28512776.jpeg"
                            title="Noor Chikankari Kurti"
                            price="₹1,000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/8330427/pexels-photo-8330427.jpeg"
                            title="Formal Trouser & Pants"
                            price="₹700" />

                    </div>
                </div>


                <div className="w-full h-44 sm:h-52 md:h-60 flex flex-col justify-center items-center text-center bg-blue-100">
                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold italic tracking-wide">
                        Fashion Sale
                    </h1>

                    {/* Subtitle with bars */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                        <div className="w-8 sm:w-12 md:w-16 h-1 bg-gray-400"></div>

                        <h1 className="text-base sm:text-xl md:text-3xl font-light text-gray-800 whitespace-nowrap">
                            Upto 20% Off
                        </h1>

                        <div className="w-8 sm:w-12 md:w-16 h-1 bg-gray-400"></div>
                    </div>
                </div>


                <div className="overflow-hidden bg-blue-100 mt-8 w-full px-4 sm:px-6 md:px-8">
                    <div className="flex gap-4 sm:gap-6 md:gap-10 w-max flex-nowrap animate-marquee-reverse mb-15">

                        {/* ===== ORIGINAL CARDS ===== */}

                        <FashionSale
                            image="https://images.pexels.com/photos/30235875/pexels-photo-30235875.jpeg"
                            title="Elegant Corporate Shirt"
                            price="₹500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/27334197/pexels-photo-27334197.jpeg"
                            title=" Traditional Wear Kurta Set"
                            price="₹700" />

                        <FashionSale
                            image="https://images.pexels.com/photos/35243685/pexels-photo-35243685.jpeg"
                            title="Denim Jeans"
                            price=" ₹1500–₹2000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/6311676/pexels-photo-6311676.jpeg"
                            title="Everyday Wear Joggers"
                            price="₹900" />

                        <FashionSale
                            image="https://images.pexels.com/photos/15245868/pexels-photo-15245868.jpeg"
                            title="Breathable Gym Wear"
                            price="₹1100" />

                        <FashionSale
                            image="https://images.pexels.com/photos/28213774/pexels-photo-28213774.jpeg"
                            title="Cotton Kurti"
                            price="250–₹500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/6764010/pexels-photo-6764010.jpeg"
                            title="Cozy Winter Wear Set"
                            price=" ₹800–₹1500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/4723202/pexels-photo-4723202.jpeg"
                            title="Soft Fabric Casual Top"
                            price="₹500" />

                        {/* ===== DUPLICATE SAME CARDS FOR INFINITE LOOP ===== */}

                        <FashionSale
                            image="https://images.pexels.com/photos/30235875/pexels-photo-30235875.jpeg"
                            title="Elegant Corporate Shirt"
                            price="₹500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/27334197/pexels-photo-27334197.jpeg"
                            title=" Traditional Wear Kurta Set"
                            price="₹700" />

                        <FashionSale
                            image="https://images.pexels.com/photos/35243685/pexels-photo-35243685.jpeg"
                            title="Denim Jeans"
                            price=" ₹1500–₹2000" />

                        <FashionSale
                            image="https://images.pexels.com/photos/6311676/pexels-photo-6311676.jpeg"
                            title="Everyday Wear Joggers"
                            price="₹900" />

                        <FashionSale
                            image="https://images.pexels.com/photos/15245868/pexels-photo-15245868.jpeg"
                            title="Breathable Gym Wear"
                            price="₹1100" />

                        <FashionSale
                            image="https://images.pexels.com/photos/28213774/pexels-photo-28213774.jpeg"
                            title="Cotton Kurti"
                            price="250–₹500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/6764010/pexels-photo-6764010.jpeg"
                            title="Cozy Winter Wear Set"
                            price=" ₹800–₹1500" />

                        <FashionSale
                            image="https://images.pexels.com/photos/4723202/pexels-photo-4723202.jpeg"
                            title="Soft Fabric Casual Top"
                            price="₹500" />

                    </div>
                </div>
            </div>

            {/* mac product special offers */}

            <div
                className="w-full h-48 sm:h-56 md:h-64 rounded-xl shadow-md mt-12 sm:mt-16 md:mt-20 flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-8 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg')",
                }}
            >
                {/* Left Text */}
                <motion.h1
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-base sm:text-xl md:text-3xl lg:text-3xl font-semibold text-black max-w-xs sm:max-w-md md:max-w-lg text-center md:text-left"
                >
                    Your Apple Favorites, Now 10% Off
                </motion.h1>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-5 justify-center md:justify-between mt-8'>

                {/* First Card */}
                <motion.div
                    initial={{ x: -120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-full sm:w-[90%] md:w-[32%] h-66 sm:h-72 md:h-130 mt-6 md:mt-10 bg-[url('https://images.pexels.com/photos/31556430/pexels-photo-31556430.jpeg')] bg-cover bg-center flex flex-col rounded-xl p-6 sm:p-6 md:p-8 gap-4 text-center items-center"
                >
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-amber-50 font-bold mt-16 sm:mt-8 md:mt-40'>
                        Up to 30% OFF
                    </h1>
                    <h1 className='text-3xl sm:text-2xl md:text-4xl text-amber-50 font-bold'>
                        Chic Styles
                    </h1>
                    <button onClick={scrolltoTop} className="bg-white px-4 sm:px-5 py-3 sm:py-4 w-fit text-sm sm:text-lg md:text-lg font-bold cursor-pointer text-gray-800 rounded-2xl hover:bg-pink-300 hover:text-white hover:scale-105 transition-all duration-300">
                        Shop Now
                    </button>
                </motion.div>


                {/* Second Card */}
                <motion.div
                    initial={{ y: -80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-full sm:w-[90%] md:w-[32%] h-96 sm:h-96 md:h-130 mt-6 md:mt-10 bg-[url('https://images.pexels.com/photos/17243579/pexels-photo-17243579.jpeg')] bg-cover bg-center flex flex-col rounded-xl p-6 sm:p-6 md:p-8 gap-3 text-center items-center"
                >
                    <h1 className='text-xl sm:text-2xl md:text-2xl text-amber-50 font-bold mt-10 md:mt-10'>New collection</h1>
                    <h1 className='text-2xl sm:text-3xl md:text-3xl text-amber-50 font-bold'>Hot Deals on Fashion & Tech</h1>
                    <h1 className='text-sm sm:text-base md:text-xl text-amber-50 font-bold'>Get up to 30% OFF on must-haves </h1>

                    {timeLeft ? (
                        <div className="flex gap-2 sm:gap-3 md:gap-2 mt-3 sm:mt-4 flex-wrap justify-center">
                            {/* Days */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-10 bg-black backdrop-blur-md rounded-lg flex flex-col items-center justify-center">
                                <span className="text-lg sm:text-2xl md:text-lg font-bold text-white">{timeLeft.days}</span>
                                <span className="text-xs sm:text-sm md:text-xs text-white uppercase">Days</span>
                            </div>
                            {/* Hours */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-10 bg-black backdrop-blur-md rounded-lg flex flex-col items-center justify-center">
                                <span className="text-lg sm:text-2xl md:text-lg font-bold text-white">{timeLeft.hours}</span>
                                <span className="text-xs sm:text-sm md:text-xs text-white uppercase">Hours</span>
                            </div>
                            {/* Minutes */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-10 bg-black backdrop-blur-md rounded-lg flex flex-col items-center justify-center">
                                <span className="text-lg sm:text-2xl md:text-lg font-bold text-white">{timeLeft.minutes}</span>
                                <span className="text-xs sm:text-sm md:text-xs text-white uppercase">Min</span>
                            </div>
                            {/* Seconds */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-10 bg-black backdrop-blur-md rounded-lg flex flex-col items-center justify-center">
                                <span className="text-lg sm:text-2xl md:text-lg font-bold text-white">{timeLeft.seconds}</span>
                                <span className="text-xs sm:text-sm md:text-xs text-white uppercase">Sec</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-500 text-sm sm:text-base md:text-sm font-bold mt-2">Time Over!</div>
                    )}


                    <button onClick={scrolltoTop} className="bg-white px-4 sm:px-5 py-3 sm:py-4 w-fit text-sm sm:text-lg md:text-md cursor-pointer font-bold text-gray-800 rounded-2xl hover:bg-pink-300 hover:text-white hover:scale-105 transition-all duration-300 mt-2 sm:mt-3">
                        Shop Now
                    </button>
                </motion.div>

                {/* Third Card */}
                <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-full sm:w-[90%] md:w-[32%] h-66 sm:h-72 md:h-130 mt-6 md:mt-10 bg-[url('https://images.pexels.com/photos/9077993/pexels-photo-9077993.jpeg')] bg-cover bg-center flex flex-col rounded-xl p-6 sm:p-6 md:p-8 gap-4 text-center items-center"
                >
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-amber-50 font-bold mt-10 sm:mt-2 md:mt-40'>
                        Fresh Arrivals
                    </h1>
                    <h1 className='text-2xl sm:text-xl md:text-3xl text-amber-50 font-bold'>Stylish men's picks</h1>
                    <button onClick={scrolltoTop} className="bg-white px-4 sm:px-5 py-3 sm:py-4 w-fit text-sm sm:text-lg md:text-lg cursor-pointer font-bold text-gray-800 rounded-2xl hover:bg-pink-300 hover:text-white hover:scale-105 transition-all duration-300 mt-2 sm:mt-3">
                        Shop Now
                    </button>
                </motion.div>

            </div>


            {/* next */}

            <div className='bg-blue-100 w-full h-200 sm:h-220 md:h-200 mt-15 text-center gap-5 p-6 sm:p-8 md:p-25 flex flex-col justify-center items-center'>
                <h1 className='text-black text-3xl sm:text-2xl md:text-3xl'>New collection</h1>
                <h1 className='text-black text-5xl sm:text-3xl md:text-5xl font-bold mt-4 sm:mt-5 md:mt-6'>Fashion for Every You</h1>
                <h1 className='text-black text-3xl sm:text-2xl md:text-3xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] mt-4 sm:mt-5 md:mt-7'>Unleash Your Style</h1>


                {/* Carousel */}
                <div className="overflow-hidden w-full mt-10">
                    <div className="flex gap-3 w-max min-w-full animate-marquee">
                        {/* Card group */}
                        <div className="flex gap-6 flex-nowrap">
                            <CategoryCard
                                image="https://images.pexels.com/photos/31019508/pexels-photo-31019508.jpeg"
                                title="Chic Bags"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/35209599/pexels-photo-35209599.jpeg"
                                title="Trendy Shoes"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/17243573/pexels-photo-17243573.jpeg"
                                title="Luxury Watches"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/31019508/pexels-photo-31019508.jpeg"
                                title="Chic Bags"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/35209599/pexels-photo-35209599.jpeg"
                                title="Trendy Shoes"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/17243573/pexels-photo-17243573.jpeg"
                                title="Luxury Watches"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/31019508/pexels-photo-31019508.jpeg"
                                title="Chic Bags"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/35209599/pexels-photo-35209599.jpeg"
                                title="Trendy Shoes"
                                onClick={scrolltoTop}
                            />
                            <CategoryCard
                                image="https://images.pexels.com/photos/17243573/pexels-photo-17243573.jpeg"
                                title="Luxury Watches"
                                onClick={scrolltoTop}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {
                open && (
                    <QuickView product={selectProduct}
                        onClose={() => setOpen(false)} />

                )

            }

        </div >

    )
}

export default Home