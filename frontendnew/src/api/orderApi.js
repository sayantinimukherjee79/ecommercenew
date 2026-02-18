import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const placeOrder = (orderData) => {
  const token = localStorage.getItem("token");
  return API.post("/orders/place", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
