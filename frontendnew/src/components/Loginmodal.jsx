import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Forgetpasswordmodal from './Forgetpasswordmodal';


function Loginmodal({ show, onClose, onForgetPassword }) {
    if (!show) return null;

    const [showpassword, setShowpassword] = useState(false);

    return (
        <>

            <div onClick={onClose} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg w-[450px]">

                    <div className='bg-blue-100 w-full p-2 flex justify-between'>
                        <h1 className='text-lg font-bold text-gray-900'>
                            ThemeHunk Member
                        </h1>

                        <button onClick={onClose} className='cursor-pointer'>
                            <RxCross2 size={25} />
                        </button>
                    </div>



                    {/* captcha */}

                    <div className='border border-gray-400 px-3 py-3 mt-5 flex justify-center items-center'>
                        <div className='w-full h-auto mt-1 items-center flex gap-3 '>

                            <input type="checkbox"

                                className='w-7 h-7 mt-1 border-2 border-transparent hover:border-black transition-all duration-200' />
                            <span className='text-xl font-medium text-black'>I am not a Robot</span>


                        </div>

                        <div className='flex flex-col gap-1'>
                            <button>
                                <FaArrowRotateRight size={25} />
                            </button>

                            <h1 className='text-lg text-gray-600 font-semibold'>
                                reCAPTCHA
                            </h1>

                            <h1 className='text-sm text-gray-600 font-semibold cursor-pointer hover:underline'>
                                Privacy-Terms
                            </h1>
                        </div>

                    </div>

                    {/* username/email */}

                    <div className='mt-4 gap-5 relative'>
                        <h1 className='text-xl font-semibold text-black'>Username/Email</h1>
                        <div className='absolute left-3 top-[70%] -translate-y-1/2 text-gray-400'>
                            <FaUser size={25} />
                        </div>
                        <input type="email" placeholder='Username/Email...' className='px-12 w-full py-3 mt-4 border border-gray-500 font-semibold text-xl' />
                    </div>

                    {/* password */}

                    <div className='mt-4 gap-5 relative'>
                        <h1 className='text-xl font-semibold text-black'>Password</h1>
                        <input type={showpassword ? "text" : "password"}
                            placeholder='Enter Password Here...'
                            className='px-12 w-full py-3 mt-4 border border-gray-500 pr-12 font-semibold text-xl' />

                        {/* left icon */}

                        <div className='absolute left-3 top-[70%] -translate-y-1/2 text-gray-400'>
                            <IoLockClosed size={25} />
                        </div>

                        {/* right icon */}

                        <div className='absolute right-3 top-[60%] cursor-pointer text-gray-600' onClick={() => setShowpassword(!showpassword)}>
                            {showpassword ? <FaRegEyeSlash size={25} /> : <IoEyeOutline size={25} />}
                        </div>

                    </div>

                    <div className='flex gap-3 mt-4 items-center'>
                        <input type="checkbox" className='w-5 h-5' />
                        <span className='text-lg font-semibold text-gray-800'>Stay signed in</span>
                    </div>

                    <div className='flex gap-4 mt-6'>
                        <button className='rounded-lg font-semibold text-white bg-blue-950 py-3 px-6 cursor-pointer hover:bg-blue-800 hover:scale-105 transition-all duration-300'>Login</button>
                        <button onClick={() => {
                            onForgetPassword();
                            
                        }}
                            className='cursor-pointer text-blue-400 font-semibold text-lg hover:underline'>
                            Forget Password?
                        </button>

                    </div>
                </div>

            </div>

           


        </>
    )
}

export default Loginmodal