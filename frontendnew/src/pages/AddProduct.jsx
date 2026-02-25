//this file is only for Admin not for customer

import React from 'react'
import { useState } from 'react';
import axios from "axios";

function AddProduct() {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("price",price);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("image", image);

            const BASE_URL = import.meta.env.VITE_API_BASE_URL;

            const res = await axios.post(
                "http://localhost:5000/products" || `${BASE_URL}/products`,

                formData,
                {
                    headers: {
                        "Content-Type" : "multipart/form-data",
                    },
                }
            );

            console.log("Product Created:", res.data);
            alert("Product added successfully");

            //reset form

            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setImage(null);



        }catch (error){
            console.error(error.response?.data || error.message);
            alert("Failed to add product");
        }   

    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label> <br />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>


                <div>
                    <label>Price</label> <br />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />

                </div>


                <div>
                    <label>Description</label> <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Category</label> <br />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>

                        <option value="">Select category</option>
                        <option value="6976231012b49e672a0efcb5">Women Clothing</option>
                        <option value="69762227c8da9af66e679bc5">Men Clothing</option>
                        <option value="697623d806890b906f1b42bd">Makeup</option>
                        <option value="697624221e5f65e868d2b925">Skincare</option>
                        <option value="6976247d6225b75abc4ce6b4">Footwear</option>
                        <option value="6976250eebaa4b73cb2bf206">Fragrance</option>
                        <option value="6976254939d0bd887af4159d">Ethnic Wear</option>
                        <option value="69762585259d74fc2fb263dc">Watch</option>
                        <option value="6976262e5d4f74e61779dfe8">Fitness Wear</option>
                        <option value="697626d05b488df55d052725">Denim Wear</option>
                        <option value="6976276ccc63f050648c5829">Hair Products</option>
                        <option value="697627e741f2b0724a333326">Electronics</option>
                        <option value="6976285472c73bf54e8fb776">Furnitures</option>
                    </select>
                </div>

                <div>
                    <label>Product Image</label>  <br />

                    <input
                        type="file"
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])} />

                </div>

                <button type='submit'>Add Product</button>

            </form>

        </div>
    );
};

export default AddProduct