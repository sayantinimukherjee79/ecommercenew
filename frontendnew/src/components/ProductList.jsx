import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';



function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("getting error in fetching products:", err));
    }, []);

    return (
        <div className="flex flex-wrap gap-4">
            {
                products.map((product) => (

                    <ProductCard
                        key={product._id}
                        _id={product._id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                    />

                )

                )
            }
        </div>
    );
}

export default ProductList