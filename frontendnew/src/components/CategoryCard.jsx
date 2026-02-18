import React from "react";

function CategoryCard({ image, title, onClick }) {
    return (
        <div
            className="group relative min-w-[280px] sm:min-w-[350px] md:min-w-[420px] h-60 sm:h-80 md:h-[400px] rounded-2xl bg-cover bg-center cursor-pointer flex items-center justify-center p-4 sm:p-5 md:p-6"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-2 sm:px-4">
                    <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl text-center">
                        {title}
                    </h1>

                    <button
                        onClick={onClick}
                        className="bg-black px-4 sm:px-5 md:px-6 py-3 sm:py-4 w-fit text-sm sm:text-base md:text-lg font-bold cursor-pointer text-white rounded-xl mt-3 sm:mt-4 md:mt-4 
                        hover:bg-amber-200 hover:text-gray-800 hover:scale-105 
                        transition-all duration-300 ease-in-out transform"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
