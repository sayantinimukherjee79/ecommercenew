import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = "http://localhost:5000/products" || `${BASE_URL}/products`;

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
