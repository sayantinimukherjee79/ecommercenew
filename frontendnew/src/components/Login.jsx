import React, { useState } from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isActiveTab, setisActiveTab] = useState("login");
    const [showVendor, setShowVendor] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    //signup steps

    const [name, setName] = useState("");
    const [signupPassword, setSignupPassword] = useState("");


    const [signupEmail, setSignupEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("customer");
     const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const handleRegister = async (e) => {

        e.preventDefault();

        // ✅ FRONTEND VALIDATION (ADD HERE)
        if (!phone) {
            toast.warning("Phone number is required");
            return;
        }

        try {
            const res = await axios.post(
                 `${BASE_URL}/api/auth/register`,
                {
                    name,
                    email: signupEmail,
                    password: signupPassword,
                    phone,
                    role,
                    shopName: role === "vendor" ? shopName : undefined,
                    shopUrl: role === "vendor" ? shopUrl : undefined,
                }

            );


            console.log("Registration successful", res.data);
           toast.success("Registration successful, please login");


            //awitch to login tab

            setisActiveTab("login");

        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Registration failed");

        }

    };

    //stores email
    const [email, setEmail] = useState("");

    //stores password
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

           
            const res = await axios.post(
                 `${BASE_URL}/api/auth/login`,
                { email, password }
            );

            //save token

            localStorage.setItem("token", res.data.token);

            console.log("Login Successful", res.data);

            navigate("/");

        } catch (error) {

            console.error(error.response?.data || error.message);
            toast.error("Invalid credentials");


        }
    }

    const [shopName, setShopName] = useState("");
    const [shopUrl, setShopUrl] = useState("");


    return (
        <div className="flex justify-center items-start bg-blue-100 w-full min-h-screen px-3 sm:px-6">
            <div className="flex flex-col rounded-2xl bg-white w-full max-w-md sm:max-w-lg min-h-[500px] mt-10 sm:mt-20">

                {/* Logo */}
                <div className="flex justify-center mt-4">
                    <img
                        src={logo}
                        alt="imagelogo"
                        className="h-10 sm:h-12 md:h-16 w-auto cursor-pointer"
                    />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
                    <button
                        type="button"
                        onClick={() => setisActiveTab("login")}
                        className={`px-6 sm:px-10 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-xl transition-all duration-300
            ${isActiveTab === "login"
                                ? "bg-blue-950 text-white"
                                : "bg-gray-200 text-black"}`}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => setisActiveTab("signup")}
                        className={`px-6 sm:px-10 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-xl transition-all duration-300
            ${isActiveTab === "signup"
                                ? "bg-blue-950 text-white"
                                : "bg-gray-200 text-black"}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* LOGIN */}
                {isActiveTab === "login" && (
                    <div className="px-4 sm:px-6">

                        <label className="block mt-8 font-semibold text-base sm:text-lg text-gray-600">
                            Username or email <span className="text-red-600">*</span>
                        </label>

                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-3 px-4 py-3 border border-gray-400 rounded-lg"
                        />

                        <label className="block mt-6 font-semibold text-base sm:text-lg text-gray-600">
                            Password <span className="text-red-600">*</span>
                        </label>

                        <div className="relative mt-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-400 rounded-lg pr-12"
                            />

                            {showPassword ? (
                                <MdOutlineRemoveRedEye
                                    size={22}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaEyeSlash
                                    size={22}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
                            <button
                                onClick={handleLogin}
                                className="w-full sm:w-auto bg-blue-950 text-white font-semibold text-base sm:text-lg px-8 py-3 rounded-xl hover:bg-blue-900 transition"
                            >
                                Login
                            </button>

                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="w-4 h-4" />
                                Remember me
                            </label>
                        </div>

                        <button className="block mt-6 mb-10 text-base sm:text-lg font-semibold text-gray-600 underline">
                            Lost Your Password?
                        </button>
                    </div>
                )}

                {/* SIGNUP */}
                {isActiveTab === "signup" && (
                    <div className="px-4 sm:px-6">

                        <label className="block mt-6 font-semibold text-base sm:text-lg text-gray-600">
                            Full Name <span className="text-red-600">*</span>
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-3 px-4 py-3 border border-gray-400 rounded-lg"
                        />

                        <label className="block mt-6 font-semibold text-base sm:text-lg text-gray-600">
                            Email Address <span className="text-red-600">*</span>
                        </label>

                        <input
                            type="text"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="w-full mt-3 px-4 py-3 border border-gray-400 rounded-lg"
                        />

                        <p className="mt-4 text-sm sm:text-base text-gray-600">
                            A link to set a new password will be sent to your email.
                        </p>

                        <label className="block mt-6 font-semibold text-base sm:text-lg text-gray-600">
                            Password <span className="text-red-600">*</span>
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="w-full mt-3 px-4 py-3 border border-gray-400 rounded-lg"
                        />

                        {/* Role */}
                        <div className="flex flex-col gap-4 mt-6">
                            <label className="flex items-center gap-3">
                                <input type="radio" checked={role === "customer"} onChange={() => setRole("customer")} />
                                Customer
                            </label>

                            <label className="flex items-center gap-3">
                                <input type="radio" checked={role === "vendor"} onChange={() => setRole("vendor")} />
                                Vendor
                            </label>
                        </div>

                        <label className="block mt-6 font-semibold text-base sm:text-lg text-gray-600">
                            Phone Number <span className="text-red-600">*</span>
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mt-3 px-4 py-3 border border-gray-400 rounded-lg"
                        />

                        <button
                            onClick={handleRegister}
                            className="w-full mt-8 mb-10 bg-blue-950 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-xl hover:bg-blue-900 transition"
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Login