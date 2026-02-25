import axios from "axios";

const API = axios.create({
    //backend port
    baseURL: "http://localhost:5000" || import.meta.env.VITE_API_BASE_URL, 
});

//register user

export const registerUser =  (userData) => {
    return API.post("/register", userData);
};