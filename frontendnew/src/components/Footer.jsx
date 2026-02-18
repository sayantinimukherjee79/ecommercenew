import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

function Footer() {
    return (
        <div>
            {/* Main Footer */}
           <div className='flex flex-col md:flex-row flex-wrap justify-between w-full max-w-full gap-8 md:gap-10 bg-black mt-6 p-6 md:p-10'>

                {/* Assistance Section */}
                <div className='flex-1 min-w-[250px]'>
                    <h1 className='text-3xl md:text-5xl text-white font-bold'>Need Assistance?</h1>
                    <p className='text-white text-lg md:text-2xl mt-4 md:mt-7'>Call Us: +1 (888) 456-789 or +1 (888) 333-000</p>
                    <p className='text-white text-lg md:text-2xl mt-4 md:mt-7'>Head Office:</p>
                    <p className='text-white text-lg md:text-2xl mt-2'>1200 Market Street, Suite 400</p>
                    <p className='text-white text-lg md:text-2xl mt-2'>San Francisco, CA 94102, USA</p>
                    <p className='text-white text-lg md:text-2xl mt-4 md:mt-7'>Email: support@buynest.com</p>
                </div>

                {/* Store Locations */}
                <div className='flex-1 min-w-[200px]'>
                    <h1 className='text-3xl md:text-5xl text-white font-bold'>Store Location</h1>
                    <div className='mt-4 md:mt-7 space-y-1 md:space-y-2'>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Toronto, Canada</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Berlin, Germany</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Dubai, UAE</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Tokyo, Japan</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Sydney, Australia</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Madrid, Spain</p>
                    </div>
                </div>

                {/* Customer Service */}
                <div className='flex-1 min-w-[200px]'>
                    <h1 className='text-3xl md:text-5xl text-white font-bold'>Customer Service</h1>
                    <div className='mt-4 md:mt-7 space-y-1 md:space-y-2'>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Contact Us</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>FAQs</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Shipping & Delivery</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Returns & Exchanges</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Track Your Order</p>
                        <p className='text-white text-lg md:text-2xl cursor-pointer'>Payment Options</p>
                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 min-w-[250px]'>
                    <h1 className='text-3xl md:text-5xl text-white font-bold mt-4 md:mt-6'>Style in Every Shot</h1>
                    <img 
                        src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg" 
                        alt="footerimage" 
                        className='h-40 md:h-70 w-auto mt-4 md:mt-7 rounded-md object-cover' 
                    />
                </div>
            </div>

            {/* Bottom Footer */}
            <div className='flex flex-col md:flex-row items-center justify-between mt-6 p-4 md:p-6 gap-4 md:gap-0'>
                <div className='flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2 text-sm md:text-xl text-gray-300'>
                    <p>Copyright |</p>
                    <p>Th Shop Mania |</p>
                    <p>Developed by Theme Hunk</p>
                </div>
                <div className='flex gap-3 md:gap-5 mt-2 md:mt-0'>
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaFacebookF className="text-xl md:text-2xl" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-sky-400 text-white cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaTwitter className="text-xl md:text-2xl" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaYoutube className="text-xl md:text-2xl" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-green-500 text-white cursor-pointer hover:scale-110 transition-transform duration-300">
                        <IoLogoWhatsapp className="text-xl md:text-2xl" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:scale-110 transition-transform duration-300">
                        <FaInstagram className="text-xl md:text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
