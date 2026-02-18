import React from 'react'

// props---> function arguments(means give me the product data from parent)

function QuickView({ product, onClose }) {
    if (!product) return null
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-6 w-[700px] flex gap-6"
                onClick={(e) => e.stopPropagation()}>
                <div className="w-1/2">
                    {/* product image */}

                    <img src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg" />
                </div>

                {/* product details */}
                <div className="w-1/2 flex flex-col gap-3">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-lg text-emerald-600 font-semibold">₹{product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                    <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg w-fit">Add to Cart</button>
                    <p></p>
                </div>
            </div>

        </div>

    )
}

export default QuickView