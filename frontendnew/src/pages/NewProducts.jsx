import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";

import Demo from '../components/Demo';
import Scrollup from '../components/Scrollup';
import Topup from '../components/Topup';
import ShopFilters from "../components/ShopFilters";
import JewelleryCard from "../components/JewelleryCard";

function NewProducts() {

    const dropdownref = useRef(null);
    const [open, setOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedClothing, setSelectedClothing] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_API_BASE_URL;
                const res = await axios.get("http://localhost:5000/products/new" || `${BASE_URL}/products/new`);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNewProducts();
    }, []);

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleClothingChange = (type) => {
        setSelectedClothing(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleColorChange = (color) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const brandGroups = {
        Jewelry: ["Zaveri Pearls", "Pipa Bella", "Titan", "Giva"],
        Clothing: ["Nike", "Savana", "UrbanEdge", "DenimVibe"],
        Beauty: ["Swiss Beauty", "Maybelline", "Mamaearth", "Plum"],
        Fragrance: ["Bella Vita", "Wild Stone", "Renne"],
        Electronics: ["Agaro", "Philips", "Samsung"]
    };

    const clothingTypes = ["Bodycon", "Gym wear", "Ethnic", "Western", "Denim", "Jacket", "Formal"];
    const colors = ["Black", "Blue", "Green", "Pink", "Red", "Nude", "Beige", "Pastel", "Purple", "Wine", "White", "Gray", "Yellow"];

    //filtered products

    const filteredProducts = products
        .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
        .filter(p => selectedClothing.length === 0 || selectedClothing.includes(p.type))
        .filter(p => selectedColors.length === 0 || selectedColors.includes(p.color))
        .filter(p => p.price <= maxPrice);


    //sorted products

    const sortedProducts = [...filteredProducts] 
    //[...] this is spread operator, it takes all elements from an array and spread them to another array

    if (sortOption === "Top Selling Product")
        sortedProducts.sort((a, b) => b.purchaseCount - a.purchaseCount);
    else if (sortOption === "Top Wishlisted Product")
        sortedProducts.sort((a, b) => b.wishlistCount - a.wishlistCount);


    const STORAGE_KEY = "newProductsCurrentPage";
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem(STORAGE_KEY);
        return savedPage ? Number(savedPage) : 1;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, currentPage);
    }, [currentPage]);


    //pagination

    const itemsPerPage = 16;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-7 px-4 lg:px-8 overflow-x-hidden">

            <Demo />
            <Scrollup />
            <Topup />

            {/* Desktop Filters */}
            <div className="hidden lg:block w-[280px]">
                <ShopFilters
                    title="New Products"
                    selectedBrands={selectedBrands}
                    selectedClothing={selectedClothing}
                    selectedColors={selectedColors}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    handleBrandChange={handleBrandChange}
                    handleClothingChange={handleClothingChange}
                    handleColorChange={handleColorChange}
                    brandGroups={brandGroups}
                    clothingTypes={clothingTypes}
                    colors={colors}
                />
            </div>

            {/* Mobile / Tablet Filter Drawer */}
            {showFilters && (
                <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
                    <div className="absolute left-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
                        <button
                            onClick={() => setShowFilters(false)}
                            className="mb-4 text-sm font-semibold"
                        >
                            ✕ Close
                        </button>

                        <ShopFilters
                            title="New Products"
                            selectedBrands={selectedBrands}
                            selectedClothing={selectedClothing}
                            selectedColors={selectedColors}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            handleBrandChange={handleBrandChange}
                            handleClothingChange={handleClothingChange}
                            handleColorChange={handleColorChange}
                            brandGroups={brandGroups}
                            clothingTypes={clothingTypes}
                            colors={colors}
                        />
                    </div>
                </div>
            )}

            {/* Products */}
            <main className="flex-1 w-full">

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowFilters(true)}
                    className="flex lg:hidden items-center gap-2 mb-4 px-4 py-2 border rounded-md text-sm font-medium"
                >
                    ☰ Filters
                </button>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-sm sm:text-lg font-semibold text-gray-500">
                        Showing {filteredProducts.length === 0 ? 0 : firstIndex + 1}–
                        {Math.min(lastIndex, filteredProducts.length)} of {filteredProducts.length} results
                    </h1>

                    <div className="flex items-center gap-3">
                        <h1 className="text-sm font-normal text-gray-500">Sort By:</h1>

                        <div ref={dropdownref} className="relative w-44 sm:w-48">
                            <div
                                onClick={() => setOpen(!open)}
                                className="w-full px-3 py-2 text-lg font-semibold text-gray-600 border rounded-md cursor-pointer flex justify-between items-center"
                            >
                                {sortOption || "Default Sorting"}
                                <BiSolidDownArrow className={`transition-transform ${open ? "rotate-180" : ""}`} />
                            </div>

                            {open && (
                                <ul className="absolute top-full left-0 w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                                    <li
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSortOption("Top Selling Product");
                                            setOpen(false);
                                        }}
                                    >
                                        Top Selling Product
                                    </li>
                                    <li
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSortOption("Top Wishlisted Product");
                                            setOpen(false);
                                        }}
                                    >
                                        Top Wishlisted Product
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mt-10 lg:ml-15 xl:ml-15 2xl:ml-15">
                    {currentProducts.map(product => (
                        <JewelleryCard
                            key={product._id}
                            id={product._id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="p-4 bg-gray-200 rounded hover:bg-blue-900 hover:text-white"
                            >
                                <FaArrowLeft />
                            </button>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded ${currentPage === i + 1
                                    ? "bg-blue-900 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        {currentPage < totalPages && (
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="p-4 bg-gray-200 rounded hover:bg-blue-900 hover:text-white"
                            >
                                <FaArrowRight />
                            </button>
                        )}
                    </div>
                )}


            </main>
        </div>
    );
}

export default NewProducts;
