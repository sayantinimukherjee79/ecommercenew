import React from "react";

function ShopFilters({
    title,
    selectedBrands,
    selectedClothing,
    selectedColors,
    maxPrice,
    setMaxPrice,
    handleBrandChange,
    handleClothingChange,
    handleColorChange,
    brandGroups,
    clothingTypes,
    colors
}) {
    return (
        <aside className="w-full lg:w-80 px-4 lg:px-0 lg:ml-5 mb-10 lg:mb-0">
            
            {/* Title */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    {title}
                </h1>
                <h1 className="text-sm font-normal text-gray-500 mt-3">
                    Home <span className="mx-1">/</span> {title}
                </h1>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 mt-5">
                Filters
            </h2>

            {/* Price Filter */}
            <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">
                    Price
                </h2>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full mb-3"
                />
                <div className="flex justify-between text-sm sm:text-base font-medium text-black">
                    <span>₹0</span>
                    <span>₹{maxPrice}</span>
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                    Brands
                </h2>

                {Object.entries(brandGroups).map(([group, brands]) => (
                    <div key={group} className="mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                            {group}
                        </h3>

                         <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {brands.map((brand) => (
                            <label
                                key={brand}
                                className="flex items-center gap-2 text-sm sm:text-base mb-2"
                            >
                                <input
                                    type="checkbox"
                                    className="scale-110 sm:scale-125"
                                    onChange={() => handleBrandChange(brand)}
                                    checked={selectedBrands.includes(brand)}
                                />
                                {brand}
                            </label>
                        ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Clothing Filter */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                    Clothing
                </h2>

                 <div className="grid grid-cols-2 gap-x-6 gap-y-2">

                     {clothingTypes.map((type) => (
                    <label
                        key={type}
                        className="flex items-center gap-2 text-sm sm:text-lg mb-2"
                    >
                        <input
                            type="checkbox"
                            className="scale-110 sm:scale-125"
                            onChange={() => handleClothingChange(type)}
                            checked={selectedClothing.includes(type)}
                        />
                        {type}
                    </label>
                ))}

                 </div>
               
            </div>

            {/* Color Filter */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 mt-7">
                    Color
                </h2>

                 <div className="grid grid-cols-2 gap-x-6 gap-y-2">

                     {colors.map((color) => (
                    <label
                        key={color}
                        className="flex items-center gap-2 text-sm sm:text-lg mb-2"
                    >
                        <input
                            type="checkbox"
                            className="scale-110 sm:scale-125"
                            onChange={() => handleColorChange(color)}
                            checked={selectedColors.includes(color)}
                        />
                        {color}
                    </label>
                ))}

                 </div>
               
            </div>
        </aside>
    );
}

export default ShopFilters;
