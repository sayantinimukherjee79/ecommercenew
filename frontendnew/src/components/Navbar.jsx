import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { SlCallEnd } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

import { useCart } from "../context/CartContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [dropdownFilter, setdropdownFilter] = useState("");
    const [isCategoryOpen, setisCategoryOpen] = useState(false);
    const boxRef = useRef(null);
    const [isHamburger, setIsHamburger] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories" || `${BASE_URL}/api/categories`);
                setCategoriesList(res.data.categories || res.data);

            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchCategories();
    }, []);

    const fetchSearchResults = async (text) => {
        if (!text.trim()) {
            setSearchResults([]);
            setIsSearchOpen(false);
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:5000/products/search?keyword=${text}` || `${BASE_URL}/products/search?keyword=${text}`
            );
            setSearchResults(Array.isArray(res.data) ? res.data : []);
            setIsSearchOpen(true);
        } catch {
            setSearchResults([]);
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setisCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const esc = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, []);

    const linkClass = () =>
        "relative text-black hover:text-red-400";

    const { cartItems, openCart } = useCart();
    const userToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        localStorage.removeItem("wishlist");
        navigate("/");
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    const handleSearch = () => {
        if (!searchText.trim()) return;
        navigate(`/shop?search=${encodeURIComponent(searchText)}`);
        setIsSearchOpen(false);
    };

    return (
        <nav className="w-full overflow-x-hidden">
            {/* ================= FIRST NAVBAR ================= */}
            <div
                className="w-full flex items-center justify-between
       px-4 md:px-8 lg:px-10 py-7 lg:py-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/5926408/pexels-photo-5926408.jpeg')",
                }}
            >
                {/* Logo */}
                <img
                    src={logo}
                    alt="logo"
                    className="h-10 sm:h-12 lg:h-16 w-auto cursor-pointer"
                />

                {/* Desktop Menu */}
                <ul className="hidden xl:flex gap-8 text-xl font-bold text-gray-500">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/shop" className={linkClass}>Shop</NavLink>
                    <NavLink to="/newproducts" className={linkClass}>New Products</NavLink>
                    <NavLink to="/bestdeals" className={linkClass}>Best Deals</NavLink>
                    <NavLink to="/blog" className={linkClass}>Blog</NavLink>
                    <NavLink to="/about" className={linkClass}>About Us</NavLink>
                    <NavLink to="/contacts" className={linkClass}>Contact Us</NavLink>
                </ul>

                {/* Right Icons */}
                <div className="flex items-center gap-4">
                    <Link to="/wishlist">
                        <FcLikePlaceholder size={28} />
                    </Link>

                    <div className="relative group">
                        {userToken ? (
                            <button onClick={logout}>
                                <RiContactsLine size={28} />
                            </button>
                        ) : (
                            <Link to="/login">
                                <RiContactsLine size={28} />
                            </Link>
                        )}

                        {/* Hover Tooltip */}
                        <span
                            className="absolute -bottom-15 left-1/2 -translate-x-1/2
    bg-black text-white text-xl px-2 py-1 rounded
    opacity-0 group-hover:opacity-100
    transition-opacity duration-200 whitespace-nowrap"
                        >
                            {userToken ? "Logout" : "Login"}
                        </span>
                    </div>


                    <div className="relative">
                        <MdOutlineShoppingBag size={28} onClick={openCart} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="xl:hidden text-2xl"
                        onClick={() => setIsHamburger(!isHamburger)}
                    >
                        <GiHamburgerMenu />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isHamburger && (
                    <ul className="absolute top-20 right-4 bg-white w-60 p-4
          flex flex-col gap-3 text-lg font-bold text-gray-700
          shadow-lg rounded-xl xl:hidden z-50">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/shop">Shop</NavLink>
                        <NavLink to="/newproducts">New Products</NavLink>
                        <NavLink to="/bestdeals">Best Deals</NavLink>
                        <NavLink to="/blog">Blog</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                        <NavLink to="/contacts">Contact Us</NavLink>
                    </ul>
                )}
            </div>

            {/* ================= SECOND NAVBAR ================= */}
            <div className="w-full px-4 md:px-8 lg:px-10 py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">

                    {/* LEFT: Categories */}
                    <div className="relative inline-block" ref={boxRef} >
                        <button
                            onClick={() => {
                                const rect = boxRef.current.getBoundingClientRect();
                                setDropdownPos({
                                    top: rect.bottom + 8, // gap below button
                                    left: rect.left
                                });
                                setisCategoryOpen(!isCategoryOpen);
                            }}
                            className="flex items-center gap-3 text-white bg-blue-900 px-4 py-2 min-[1268px]:px-15 min-[1268px]:py-6 rounded-xl cursor-pointer text-xl font-bold"
                        >

                            {/* always visible hamburger menu,even in mobile screen */}
                            <RxHamburgerMenu className="text-2xl" />

                            {/* only visible when screen size is 1268 or more than that */}
                            <span className="hidden lg:inline text-xl">
                                All Categories
                            </span>


                        </button>

                        {isCategoryOpen && (
                            <div
                                style={{
                                    top: dropdownPos.top,
                                    left: dropdownPos.left,
                                }}
                                className="fixed w-72 max-w-[90vw] bg-white border rounded-xl shadow-lg z-9999"
                            >
                                <ul className="p-4 space-y-3 max-h-80 overflow-y-auto">
                                    {Array.isArray(categoriesList) && categoriesList.length === 0 ? (
                                        <li className="text-gray-500 text-center">
                                            No categories found
                                        </li>
                                    ) : (
                                        categoriesList.map((cat) => (
                                            <li
                                                key={cat._id}
                                                className="cursor-pointer text-lg text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
                                                onClick={() => {
                                                    setisCategoryOpen(false);
                                                    navigate(`/shop?categoryId=${cat._id}`);
                                                }}
                                            >
                                                {cat.name}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        )}


                    </div>

                    {/* CENTER: Search */}
                    <div className="flex justify-center">
                        <div
                            ref={searchRef}
                            className="
          w-full
          max-w-60
          sm:max-w-[420px]
          md:max-w-lg
          border border-gray-300 rounded-lg
          overflow-hidden relative flex
        "
                        >
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    fetchSearchResults(e.target.value);
                                }}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search here..."
                                className="flex-1 px-3 py-2 outline-none font-bold text-sm sm:text-base"
                            />

                            <button
                                onClick={handleSearch}
                                className="bg-blue-900 px-3 flex items-center justify-center"
                            >
                                <CiSearch size={22} className="text-white" />
                            </button>

                            {isSearchOpen && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border shadow-lg z-50">
                                    <ul className="max-h-60 overflow-y-auto">
                                        {searchResults.map((item) => (
                                            <li
                                                key={item._id}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setSearchText(item.title);
                                                    setIsSearchOpen(false);
                                                    navigate(`/shop?search=${encodeURIComponent(item.title)}`);
                                                }}
                                            >
                                                {item.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Call */}
                    <div className="flex justify-end">
                        <a
                            href="tel:+7477618869"
                          className="flex items-center gap-2 text-sm sm:text-lg font-semibold hover:text-blue-700  transition cursor-pointer"
                        >
                            <SlCallEnd className="text-xl sm:text-2xl" />
                            <span className="hidden sm:inline">+7477618869</span>
                        </a>
                    </div>

                </div>
            </div>


        </nav>
    );
}

export default Navbar;
