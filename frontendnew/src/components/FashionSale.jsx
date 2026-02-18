import React from 'react';

function FashionSale({ image, title, price }) {
  return (
    <div className="w-40 sm:w-48 md:w-56 flex flex-col items-center text-center mt-6 sm:mt-8 md:mt-10">
      {/* Image Container */}
      <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Title */}
      <h1 className="text-sm sm:text-base md:text-lg text-black font-bold mt-3 sm:mt-4 md:mt-4 cursor-pointer">
        {title}
      </h1>

      {/* Price */}
      <p className="text-xs sm:text-sm md:text-base text-gray-800 font-semibold mt-1 sm:mt-2">
        {price}
      </p>
    </div>
  );
}

export default FashionSale;
