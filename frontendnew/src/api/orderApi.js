import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const placeOrder = (orderData) => {
  const token = localStorage.getItem("token");
  return API.post("/orders/place", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
