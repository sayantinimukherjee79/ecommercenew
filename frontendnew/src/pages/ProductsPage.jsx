import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsPage({ selectedBrands }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts =
    selectedBrands.length === 0
      ? products
      : products.filter((product) =>
        selectedBrands.includes(product.brand)
      );

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
